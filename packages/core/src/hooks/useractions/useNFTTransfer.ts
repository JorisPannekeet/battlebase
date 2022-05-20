import React, { useCallback } from "react";

import * as sdk from "@loopring-web/loopring-sdk";

import { connectProvides } from "@loopring-web/web3-provider";

import {
  AccountStep,
  SwitchData,
  TransferProps,
  useOpenModals,
} from "@loopring-web/component-lib";
import {
  AccountStatus,
  CoinMap,
  Explorer,
  myLog,
  SagaStatus,
  TradeNFT,
  UIERROR_CODE,
  AddressError,
} from "@loopring-web/common-resources";

import {
  useTokenMap,
  useAccount,
  BIGO,
  DAYS,
  getTimestampDaysLater,
  LoopringAPI,
  store,
  TOAST_TIME,
  useAddressCheck,
  useBtnStatus,
  checkErrorInfo,
  useModalData,
  isAccActivated,
  useChargeFees,
  useWalletLayer2NFT,
  useWalletLayer2Socket,
  walletLayer2Service,
  useSystem,
} from "../../index";
import { useWalletInfo } from "../../stores/localStore/walletInfo";

export const useNFTTransfer = <R extends TradeNFT<T>, T>({
  isLocalShow = false,
  doTransferDone,
}: {
  isLocalShow?: boolean;
  doTransferDone?: () => void;
}) => {
  const { setShowAccount, setShowNFTTransfer } = useOpenModals();

  const {
    modals: {
      isShowNFTTransfer: { nftData, nftBalance, ...nftRest },
    },
  } = useOpenModals();

  const { tokenMap, totalCoinMap } = useTokenMap();
  const { account, status: accountStatus } = useAccount();
  const { exchangeInfo, chainId } = useSystem();
  const { page, updateWalletLayer2NFT } = useWalletLayer2NFT();
  const [isConfirmTransfer, setIsConfirmTransfer] = React.useState(false);

  const { nftTransferValue, updateNFTTransferData, resetNFTTransferData } =
    useModalData();

  const [addressOrigin, setAddressOrigin] =
    React.useState<"Wallet" | null>(null);
  const {
    chargeFeeTokenList,
    isFeeNotEnough,
    handleFeeChange,
    feeInfo,
    checkFeeIsEnough,
  } = useChargeFees({
    tokenAddress: nftTransferValue.tokenAddress,
    requestType: sdk.OffchainNFTFeeReqType.NFT_TRANSFER,
    updateData: ({ fee }) => {
      updateNFTTransferData({
        ...nftTransferValue,
        fee,
      });
    },
  });

  const {
    address,
    realAddr,
    setAddress,
    addrStatus,
    isLoopringAddress,
    isAddressCheckLoading,
    isSameAddress,
  } = useAddressCheck();

  const { btnStatus, enableBtn, disableBtn } = useBtnStatus();

  const checkBtnStatus = React.useCallback(() => {
    if (
      tokenMap &&
      nftTransferValue.fee?.belong &&
      nftTransferValue?.tradeValue &&
      chargeFeeTokenList.length &&
      !isFeeNotEnough &&
      !isSameAddress &&
      addressOrigin === "Wallet" &&
      sdk.toBig(nftTransferValue.tradeValue).gt(BIGO) &&
      sdk
        .toBig(nftTransferValue.tradeValue)
        .lte(Number(nftTransferValue.nftBalance) ?? 0) &&
      (addrStatus as AddressError) === AddressError.NoError &&
      ((address && address.startsWith("0x")) || realAddr)
    ) {
      enableBtn();
      myLog("enableBtn");
      return;
    }
    disableBtn();
  }, [
    tokenMap,
    nftTransferValue.fee?.belong,
    nftTransferValue.tradeValue,
    nftTransferValue.nftBalance,
    chargeFeeTokenList.length,
    isFeeNotEnough,
    isSameAddress,
    addressOrigin,
    addrStatus,
    address,
    realAddr,
    disableBtn,
    enableBtn,
  ]);

  React.useEffect(() => {
    checkBtnStatus();
  }, [
    address,
    addrStatus,
    addressOrigin,
    isFeeNotEnough,
    isSameAddress,
    nftTransferValue.tradeValue,
    nftTransferValue.fee,
  ]);

  useWalletLayer2Socket({});

  const resetDefault = React.useCallback(() => {
    checkFeeIsEnough();
    if (nftData) {
      updateNFTTransferData({
        belong: nftData as any,
        balance: nftBalance,
        tradeValue: undefined,
        fee: feeInfo,
        ...nftRest,
        address: address ? address : "*",
      });
    } else {
      updateNFTTransferData({
        fee: feeInfo,
        belong: "",
        balance: 0,
        tradeValue: 0,
        address: "*",
      });
      setShowNFTTransfer({ isShow: false });
    }
  }, [
    checkFeeIsEnough,
    nftData,
    updateNFTTransferData,
    nftBalance,
    feeInfo,
    nftRest,
    address,
    setShowNFTTransfer,
  ]);

  React.useEffect(() => {
    if (isLocalShow) {
      resetDefault();
    }
  }, [isLocalShow]);

  React.useEffect(() => {
    if (
      accountStatus === SagaStatus.UNSET &&
      account.readyState === AccountStatus.ACTIVATED
    ) {
      myLog("useEffect nftTransferValue.address:", nftTransferValue.address);
      setAddress(nftTransferValue.address ? nftTransferValue.address : "");
    }
  }, [setAddress, nftTransferValue.address, accountStatus, account.readyState]);

  const { checkHWAddr, updateHW } = useWalletInfo();

  const [lastRequest, setLastRequest] = React.useState<any>({});

  const processRequest = React.useCallback(
    async (
      request: sdk.OriginNFTTransferRequestV3,
      isNotHardwareWallet: boolean
    ) => {
      const { apiKey, connectName, eddsaKey } = account;

      try {
        if (connectProvides.usedWeb3 && LoopringAPI.userAPI) {
          let isHWAddr = checkHWAddr(account.accAddress);

          if (!isHWAddr && !isNotHardwareWallet) {
            isHWAddr = true;
          }

          setLastRequest({ request });

          const response = await LoopringAPI.userAPI?.submitNFTInTransfer(
            {
              request,
              web3: connectProvides.usedWeb3,
              chainId:
                chainId !== sdk.ChainId.GOERLI ? sdk.ChainId.MAINNET : chainId,
              walletType: connectName as sdk.ConnectorNames,
              eddsaKey: eddsaKey.sk,
              apiKey,
              isHWAddr,
            },
            {
              accountId: account.accountId,
              counterFactualInfo: eddsaKey.counterFactualInfo,
            }
          );

          myLog("submitInternalTransfer:", response);
          setAddressOrigin(null);
          if (isAccActivated()) {
            if (
              (response as sdk.RESULT_INFO).code ||
              (response as sdk.RESULT_INFO).message
            ) {
              const code = checkErrorInfo(
                response as sdk.RESULT_INFO,
                isNotHardwareWallet
              );
              if (code === sdk.ConnectorError.USER_DENIED) {
                setShowAccount({
                  isShow: true,
                  step: AccountStep.NFTTransfer_User_Denied,
                });
                setIsConfirmTransfer(false);
              } else if (code === sdk.ConnectorError.NOT_SUPPORT_ERROR) {
                setShowAccount({
                  isShow: true,
                  step: AccountStep.NFTTransfer_First_Method_Denied,
                });
              } else {
                if (
                  [102024, 102025, 114001, 114002].includes(
                    (response as sdk.RESULT_INFO)?.code || 0
                  )
                ) {
                  checkFeeIsEnough(true);
                }

                setShowAccount({
                  isShow: true,
                  step: AccountStep.NFTTransfer_Failed,
                  error: response as sdk.RESULT_INFO,
                });
                setIsConfirmTransfer(false);
              }
            } else if ((response as sdk.TX_HASH_API)?.hash) {
              setIsConfirmTransfer(false);
              setShowAccount({
                isShow: true,
                step: AccountStep.NFTTransfer_In_Progress,
              });
              await sdk.sleep(TOAST_TIME);
              setShowAccount({
                isShow: true,
                step: AccountStep.NFTTransfer_Success,
                info: {
                  hash:
                    Explorer +
                    `tx/${(response as sdk.TX_HASH_API)?.hash}-nftTransfer-${
                      account.accountId
                    }-${request.token.tokenId}-${request.storageId}`,
                },
              });
              if (isHWAddr) {
                myLog("......try to set isHWAddr", isHWAddr);
                updateHW({ wallet: account.accAddress, isHWAddr });
              }
              walletLayer2Service.sendUserUpdate();
              updateWalletLayer2NFT({ page });
              if (doTransferDone) {
                doTransferDone();
              }
              resetNFTTransferData();
            }
          } else {
            resetNFTTransferData();
          }
        }
      } catch (reason: any) {
        const code = checkErrorInfo(reason, isNotHardwareWallet);

        if (isAccActivated()) {
          if (code === sdk.ConnectorError.USER_DENIED) {
            setShowAccount({
              isShow: true,
              step: AccountStep.NFTTransfer_User_Denied,
            });
          } else if (code === sdk.ConnectorError.NOT_SUPPORT_ERROR) {
            setShowAccount({
              isShow: true,
              step: AccountStep.NFTTransfer_First_Method_Denied,
            });
          } else {
            setShowAccount({
              isShow: true,
              step: AccountStep.NFTTransfer_Failed,
              error: {
                code: UIERROR_CODE.UNKNOWN,
                msg: reason?.message,
              },
            });
          }
        }
      }
    },
    [
      account,
      checkHWAddr,
      chainId,
      setShowAccount,
      checkFeeIsEnough,
      updateWalletLayer2NFT,
      page,
      doTransferDone,
      resetNFTTransferData,
      updateHW,
      checkFeeIsEnough,
    ]
  );

  const onTransferClick = useCallback(
    async (_nftTransferValue, isFirstTime: boolean = true) => {
      const { accountId, accAddress, readyState, apiKey, eddsaKey } = account;
      const nftTransferValue = {
        ...store.getState()._router_modalData.nftTransferValue,
        ..._nftTransferValue,
      };
      if (
        readyState === AccountStatus.ACTIVATED &&
        tokenMap &&
        LoopringAPI.userAPI &&
        exchangeInfo &&
        connectProvides.usedWeb3 &&
        nftTransferValue?.nftData &&
        nftTransferValue?.fee?.belong &&
        nftTransferValue?.fee?.__raw__ &&
        eddsaKey?.sk
      ) {
        try {
          setShowNFTTransfer({ isShow: false });
          setShowAccount({
            isShow: true,
            step: AccountStep.NFTTransfer_WaitForAuth,
          });
          const feeToken = tokenMap[nftTransferValue.fee.belong];
          const feeRaw =
            nftTransferValue.fee.feeRaw ??
            nftTransferValue.fee.__raw__?.feeRaw ??
            0;
          const fee = sdk.toBig(feeRaw);
          const tradeValue = nftTransferValue.tradeValue;
          const balance = nftTransferValue.nftBalance;
          const isExceedBalance = sdk.toBig(tradeValue).gt(balance);

          if (isExceedBalance) {
            throw Error("overflow balance");
          }

          const storageId = await LoopringAPI.userAPI?.getNextStorageId(
            {
              accountId,
              sellTokenId: nftTransferValue.tokenId,
            },
            apiKey
          );
          const req: sdk.OriginNFTTransferRequestV3 = {
            exchange: exchangeInfo.exchangeAddress,
            fromAccountId: accountId,
            fromAddress: accAddress,
            toAccountId: 0,
            toAddress: realAddr ? realAddr : address,
            storageId: storageId?.offchainId,
            token: {
              tokenId: nftTransferValue.tokenId,
              nftData: nftTransferValue.nftData,
              amount: tradeValue,
            },
            maxFee: {
              tokenId: feeToken.tokenId,
              amount: fee.toString(), // TEST: fee.toString(),
            },
            validUntil: getTimestampDaysLater(DAYS),
            memo: nftTransferValue.memo,
          };

          myLog("nftTransfer req:", req);

          processRequest(req, isFirstTime);
        } catch (e: any) {
          sdk.dumpError400(e);
          // nftTransfer failed
          setShowAccount({
            isShow: true,
            step: AccountStep.NFTTransfer_Failed,
            error: {
              code: UIERROR_CODE.UNKNOWN,
              msg: e?.message,
            },
          });
        }
      } else {
        return false;
      }
    },
    [
      account,
      tokenMap,
      exchangeInfo,
      setShowNFTTransfer,
      setShowAccount,
      realAddr,
      address,
      processRequest,
    ]
  );

  const handlePanelEvent = useCallback(
    async (data: SwitchData<R>, _switchType: "Tomenu" | "Tobutton") => {
      return new Promise<void>((res: any) => {
        if (data.to === "button") {
          if (data.tradeData.belong) {
            updateNFTTransferData({
              tradeValue: data.tradeData?.tradeValue,
              balance: data.tradeData.nftBalance,
              address: "*",
            });
          } else {
            updateNFTTransferData({
              belong: undefined,
              tradeValue: undefined,
              balance: undefined,
              address: "*",
            });
          }
        }

        res();
      });
    },
    [updateNFTTransferData]
  );

  const retryBtn = React.useCallback(
    (isHardwareRetry: boolean = false) => {
      setShowAccount({
        isShow: true,
        step: AccountStep.NFTTransfer_WaitForAuth,
      });
      processRequest(lastRequest, !isHardwareRetry);
    },
    [lastRequest, processRequest, setShowAccount]
  );
  const nftTransferProps: TransferProps<any, any> = {
    addressDefault: address,
    realAddr,
    handleSureItsLayer2: (sure: boolean) => {
      if (sure) {
        setAddressOrigin("Wallet");
      }
    },
    isConfirmTransfer,
    addressOrigin,
    tradeData: nftTransferValue as any,
    coinMap: totalCoinMap as CoinMap<T>,
    walletMap: {},
    transferBtnStatus: btnStatus,
    onTransferClick: (trade: R) => {
      isConfirmTransfer ? onTransferClick(trade) : setIsConfirmTransfer(true);
    },
    handleFeeChange,
    handleOnAddressChange: (value: any) => {
      setAddress(value || "");
    },
    addrStatus,
    feeInfo,
    chargeFeeTokenList,
    isFeeNotEnough,
    handlePanelEvent,
    isLoopringAddress,
    isSameAddress,
    isAddressCheckLoading,
  };
  const cancelNFTTransfer = () => {
    setIsConfirmTransfer(false);
    resetDefault();
  };
  return {
    nftTransferProps,
    retryBtn,
    cancelNFTTransfer,
  };
};

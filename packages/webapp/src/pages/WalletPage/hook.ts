import React from "react";
import { useAccount } from "../../stores/account";
import {
  Layer1Action,
  myLog,
  SagaStatus,
} from "@loopring-web/common-resources";
import { LoopringAPI } from "../../api_wrapper";
import {
  ChainId,
  Guardian,
  HEBAO_LOCK_STATUS,
  HebaoOperationLog,
  Protector,
} from "@loopring-web/loopring-sdk";
import { GuardianStep } from "@loopring-web/component-lib";
import { useLayer1Store } from "../../stores/localStore/layer1Store";
import { useSystem } from "../../stores/system";
import store from "../../stores";

export enum TxGuardianHistoryType {
  ADD_GUARDIAN = 51,
  GUARDIAN_CONFIRM_ADDITION = 52,
  GUARDIAN_REJECT_ADDITION = 53,
  GUARDIAN_APPROVE = 54,
  APPROVE_RECOVER = 55, // RECOVER  16
  APPROVE_TRANSFER = 56, // APPROVE TRANSFER 18
  APPROVE_TOKEN_APPROVE = 57, // 23
  ADD_GUARDIAN_WA = 58, // 34
  REMOVE_GUARDIAN_WA = 59, // 35
  UNLOCK_WALLET_WA = 60, // 37
  RESET_GUARDIANS_WA = 61, // 200
}

export enum TxHebaoAction {
  Approve,
  Reject,
}

export const useHebaoMain = <
  T extends Protector,
  G extends Guardian,
  H extends HebaoOperationLog
>() => {
  const { account, status: accountStatus } = useAccount();
  const [isContractAddress, setIsContractAddress] =
    React.useState<boolean>(false);
  LoopringAPI.walletAPI
    ?.getWalletType({
      wallet: account.accAddress,
    })
    .then(({ walletType }) => {
      if (walletType?.isContract) {
        setIsContractAddress(true);
      } else {
        setIsContractAddress(false);
      }
    });

  myLog(isContractAddress, "isContractAddress");

  const [
    { guardianConfig, protectList, guardiansList, operationLogList },
    setList,
  ] = React.useState<{
    guardianConfig: any;
    protectList: T[];
    guardiansList: G[];
    operationLogList: H[];
  }>({
    protectList: [],
    guardiansList: [],
    operationLogList: [],
    guardianConfig: {},
  });
  const [openHebao, setOpenHebao] = React.useState<{
    isShow: boolean;
    step: GuardianStep;
    options?: any;
  }>({
    isShow: false,
    step: GuardianStep.LockAccount_WaitForAuth,
    options: undefined,
  });
  const { clearOneItem } = useLayer1Store();
  const { chainId } = useSystem();
  const loadData = async () => {
    const layer1ActionHistory = store.getState().localStore.layer1ActionHistory;
    if (LoopringAPI.walletAPI && account.accAddress) {
      const [
        { raw_data: guardianConfig },
        protector,
        guardian,
        guardianoperationlog,
      ]: any = await Promise.all([
        LoopringAPI.walletAPI.getHebaoConfig(),
        LoopringAPI.walletAPI
          .getProtectors(
            {
              guardian: account.accAddress,
            },
            account.apiKey
          )
          .then((protector) => {
            protector.protectorArray.map((props) => {
              if (
                layer1ActionHistory[chainId] &&
                layer1ActionHistory[chainId][Layer1Action.GuardianLock] &&
                layer1ActionHistory[chainId][Layer1Action.GuardianLock][
                  props.address
                ] &&
                props.lockStatus === HEBAO_LOCK_STATUS.CREATED
              ) {
                props.lockStatus = HEBAO_LOCK_STATUS.LOCK_WAITING;
              } else {
                clearOneItem({
                  chainId: chainId as ChainId,
                  uniqueId: props.address,
                  domain: Layer1Action.GuardianLock,
                });
              }

              return props;
            });
            return protector;
          }),
        // api/wallet/v3/operationLogs
        LoopringAPI.walletAPI
          .getGuardianApproveList({
            guardian: account.accAddress,
          })
          .then((guardian) => {
            guardian?.guardiansArray.map((ele) => {
              ele.businessDataJson = JSON.parse(ele.businessDataJson ?? "");
              return ele;
            });
            return guardian;
          }),
        LoopringAPI.walletAPI.getHebaoOperationLogs({
          from: account.accAddress,
          fromTime: 0,
          offset: 0,
          limit: 50,
          // to?: string;
          // offset?: number;
          // network?: 'ETHEREUM';
          // statues?: string;
          // guardianTxType?: string;
          // limit?: number;
        }),
      ]).catch((error) => {
        myLog(error);
      });
      const _guardiansList: G[] = guardian?.guardiansArray
        ? guardian.guardiansArray.reduce((prev: G[], approve: G) => {
            const _protector = protector.protectorArray?.find(
              ({ address: pAddress }: any) => pAddress === approve.address
            );
            if (_protector) {
              // @ts-ignore
              approve.ens = _protector.ens;
              return [...prev, approve] as G[];
            }
            return prev;
          }, [] as G[])
        : [];

      setList({
        protectList: protector.protectorArray ?? [],
        guardiansList: _guardiansList,
        operationLogList: guardianoperationlog?.operationArray ?? [],
        guardianConfig,
      });
    }
  };
  React.useEffect(() => {
    if (account.accAddress && accountStatus === SagaStatus.UNSET) {
      loadData();
    }
  }, [accountStatus]);
  return {
    isContractAddress,
    protectList,
    guardiansList,
    guardianConfig,
    openHebao,
    operationLogList,
    setOpenHebao,
    loadData,
  };
};
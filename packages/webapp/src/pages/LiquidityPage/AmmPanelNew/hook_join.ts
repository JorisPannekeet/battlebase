import React, { useState } from "react";
import {
    AccountStatus,
    AmmData,
    AmmInData,
    CoinInfo,
    fnType,
    IBData,
    SagaStatus,
} from '@loopring-web/common-resources';
import { TradeBtnStatus } from '@loopring-web/component-lib';
import { IdMap, useTokenMap } from 'stores/token';
import { useAmmMap } from 'stores/Amm/AmmMap';
import {
    accountStaticCallBack,
    ammPairInit,
    btnClickMap,
    btnLabel,
    makeCache,
    makeWalletLayer2
} from '../../../hooks/help';
import * as sdk from 'loopring-sdk';
import {
    AmmPoolRequestPatch,
    AmmPoolSnapshot,
    ChainId,
    dumpError400,
    GetAmmPoolSnapshotRequest,
    getExistedMarket,
    GetNextStorageIdRequest,
    GetOffchainFeeAmtRequest,
    JoinAmmPoolRequest,
    LoopringMap,
    makeJoinAmmPoolRequest,
    MarketInfo,
    OffchainFeeInfo,
    OffchainFeeReqType,
    TickerData,
    toBig,
    TokenInfo,
    WsTopicType
} from 'loopring-sdk';
import { useAccount } from 'stores/account/hook';
import store from "stores";
import { LoopringAPI } from "api_wrapper";
import { deepClone } from '../../../utils/obj_tools';
import { myLog } from "utils/log_tools";
import { useTranslation } from "react-i18next";
import { useWalletLayer2Socket, walletLayer2Service } from 'services/socket';
import { useSocket } from 'stores/socket';
import { useToast } from "hooks/common/useToast";

export const useAmmJoin = <C extends { [ key: string ]: any }>({
                                                                   pair,
                                                                   snapShotData,
                                                               }
                                                                   : {
    pair: { coinAInfo: CoinInfo<C> | undefined, coinBInfo: CoinInfo<C> | undefined },
    snapShotData: { tickerData: TickerData | undefined, ammPoolsBalance: AmmPoolSnapshot | undefined } | undefined
}) => {
    const {t} = useTranslation('common');
    const {sendSocketTopic, socketEnd} = useSocket();

    const [isJoinLoading, setJoinLoading] = useState(false)

    const {toastOpen, setToastOpen, closeToast,} = useToast()

    const {marketArray, marketMap, coinMap, tokenMap} = useTokenMap();
    const {ammMap} = useAmmMap();
    const {account, status: accountStatus} = useAccount();
    const [addBtnStatus, setAddBtnStatus] = React.useState(TradeBtnStatus.AVAILABLE);

    //TODO:
    const [baseToken, setBaseToken] = useState<TokenInfo>();
    const [quoteToken, setQuoteToken] = useState<TokenInfo>();
    const [baseMinAmt, setBaseMinAmt,] = useState<any>()
    const [quoteMinAmt, setQuoteMinAmt,] = useState<any>()

    const [ammCalcData, setAmmCalcData] = React.useState<AmmInData<C> | undefined>();

    const [ammJoinData, setAmmJoinData] = React.useState<AmmData<IBData<C>, C>>({
        coinA: {belong: undefined} as unknown as IBData<C>,
        coinB: {belong: undefined} as unknown as IBData<C>,
        slippage: 0.5
    } as AmmData<IBData<C>, C>);

    const [ammDepositBtnI18nKey, setAmmDepositBtnI18nKey] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        if (account.readyState === AccountStatus.ACTIVATED) {
            sendSocketTopic({[ WsTopicType.account ]: true});
        } else {
            socketEnd()
        }
        return () => {
            socketEnd()
        }
    }, [account.readyState]);

    React.useEffect(() => {
        if (account.readyState !== AccountStatus.ACTIVATED) {
            setAddBtnStatus(TradeBtnStatus.AVAILABLE)
            setAmmDepositBtnI18nKey(accountStaticCallBack(_addBtnLabel))
        }

    }, [account.readyState])

    const initAmmData = React.useCallback(async (pair: any, walletMap: any) => {
        myLog('initAmmData:', account.accAddress, walletMap, pair)

        const _ammCalcData = ammPairInit({
            pair,
            _ammCalcData: {},
            coinMap,
            walletMap,
            ammMap,
            tickerData: snapShotData?.tickerData,
            ammPoolsBalance: snapShotData?.ammPoolsBalance
        })

        myLog('_ammCalcData:', _ammCalcData)

        setAmmCalcData({...ammCalcData, ..._ammCalcData});
        if (_ammCalcData.myCoinA) {

            const baseT = tokenMap?.[ _ammCalcData.myCoinA.belong ]

            const quoteT = tokenMap?.[ _ammCalcData.myCoinB.belong ]

            setBaseToken(baseT)
            setQuoteToken(quoteT)

            setBaseMinAmt(baseT ? sdk.toBig(baseT.orderAmounts.minimum).div('1e' + baseT.decimals).toNumber() : undefined)
            setQuoteMinAmt(quoteT ? sdk.toBig(quoteT.orderAmounts.minimum).div('1e' + quoteT.decimals).toNumber() : undefined)

            setAmmJoinData({
                coinA: {..._ammCalcData.myCoinA, tradeValue: undefined},
                coinB: {..._ammCalcData.myCoinB, tradeValue: undefined},
                slippage: 0.5
            })
        }
    }, [snapShotData, coinMap, tokenMap, ammCalcData, ammMap, setAmmCalcData, setAmmJoinData,])

    const [ammPoolSnapshot, setAmmPoolSnapShot] = useState<AmmPoolSnapshot>()

    const updateAmmPoolSnapshot = React.useCallback(async () => {

        if (!pair.coinAInfo?.simpleName || !pair.coinBInfo?.simpleName || !LoopringAPI.ammpoolAPI) {
            setToastOpen({content: t('labelAmmJoinFailed'), type: 'error'})
            return
        }

        const {market, amm} = getExistedMarket(marketArray, pair.coinAInfo.simpleName as string,
            pair.coinBInfo.simpleName as string)

        if (!market || !amm || !marketMap || !ammMap || !ammMap[ amm as string ]) {
            return
        }

        const ammInfo: any = ammMap[ amm as string ]

        const request1: GetAmmPoolSnapshotRequest = {
            poolAddress: ammInfo.address
        }

        const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot(request1)

        if (!response) {
            myLog('err res:', response)
            return
        }

        const {ammPoolSnapshot} = response

        setAmmPoolSnapShot(ammPoolSnapshot)

    }, [pair, ammMap, setAmmPoolSnapShot])

    // set fees

    const [joinFees, setJoinFees] = useState<LoopringMap<OffchainFeeInfo>>()
    const [exitFees, setExitFees] = useState<LoopringMap<OffchainFeeInfo>>()
    const {account: {accountId, apiKey}} = useAccount()

    const times = 5

    const addBtnLabelActive = React.useCallback(({ammJoinData}): string | undefined => {
        //TODO:
        const validAmt1 = ammJoinData?.coinA?.tradeValue ? ammJoinData?.coinA?.tradeValue > times * baseMinAmt : false
        const validAmt2 = ammJoinData?.coinB?.tradeValue ? ammJoinData?.coinB?.tradeValue > times * quoteMinAmt : false
        myLog('addBtnLabelActive ammJoinData', ammJoinData)
        //         // myLog('validAmt2:', validAmt2, quoteMinAmt, ' tradeValue', ammJoinData?.coinB?.tradeValue)
        // mymyLog('validAmt1:', validAmt1, baseMinAmt, ' tradeValue', ammJoinData?.coinA?.tradeValue)
        //         // myLog('validAmt2:', validAmt2, quoteMinAmt, ' tradeValue', ammJoinData?.coinB?.tradeValue)Log('validAmt1:', validAmt1, baseMinAmt, ' tradeValue', ammJoinData?.coinA?.tradeValue)
        // myLog('validAmt2:', validAmt2, quoteMinAmt, ' tradeValue', ammJoinData?.coinB?.tradeValue)

        if (isJoinLoading) {
            setAmmDepositBtnI18nKey(TradeBtnStatus.LOADING)
            return undefined
        } else {
            myLog('ammJoinData:', ammJoinData)
            if (account.readyState === AccountStatus.ACTIVATED) {
                if (validAmt1 || validAmt2) {
                    setAddBtnStatus(TradeBtnStatus.AVAILABLE)
                    return undefined
                } else if (ammJoinData === undefined
                    || ammJoinData?.coinA.tradeValue === undefined
                    || ammJoinData?.coinB.tradeValue === undefined
                    || ammJoinData?.coinA.tradeValue === 0
                    || ammJoinData?.coinB.tradeValue === 0) {
                    setAddBtnStatus(TradeBtnStatus.DISABLED)
                    return 'labelEnterAmount';
                } else {
                    const quote = ammJoinData?.coinA.belong;
                    const minOrderSize = 0 + ' ' + ammJoinData?.coinA.belong;
                    setAddBtnStatus(TradeBtnStatus.DISABLED)
                    return `labelLimitMin, ${minOrderSize}`
                }

            } else {
                setAddBtnStatus(TradeBtnStatus.AVAILABLE)
            }

        }
    }, [
        account.readyState, baseToken, quoteToken, baseMinAmt, quoteMinAmt, isJoinLoading, setAddBtnStatus])

    const _addBtnLabel = Object.assign(deepClone(btnLabel), {
        [ fnType.ACTIVATED ]: [addBtnLabelActive]
    });

    const calculateCallback = React.useCallback(async () => {
        if (accountStatus === SagaStatus.UNSET) {
            if (!LoopringAPI.userAPI || !pair.coinBInfo?.simpleName
                || account.readyState !== AccountStatus.ACTIVATED
                || !ammCalcData || !tokenMap) {
                return
            }
            const feeToken: TokenInfo = tokenMap[ pair.coinBInfo.simpleName ]

            const requestJoin: GetOffchainFeeAmtRequest = {
                accountId,
                requestType: OffchainFeeReqType.AMM_JOIN,
                tokenSymbol: pair.coinBInfo.simpleName as string,
            }

            const {fees: feesJoin} = await LoopringAPI.userAPI.getOffchainFeeAmt(requestJoin, apiKey)
            setJoinFees(feesJoin)

            const feeJoin = sdk.toBig(feesJoin[ pair.coinBInfo.simpleName ]?.fee as string).div('1e' + feeToken.decimals).toString()
                + ' ' + pair.coinBInfo.simpleName

            myLog('-> feeJoin:', feeJoin)

            setAmmCalcData({...ammCalcData, feeJoin,})
        }

    }, [
        setJoinFees, setExitFees, setAmmCalcData, setAmmDepositBtnI18nKey,
        accountStatus, account.readyState, accountId, apiKey,
        pair.coinBInfo?.simpleName, tokenMap, ammCalcData
    ])

    React.useEffect(() => {
        calculateCallback()
    }, [accountStatus, pair, ammJoinData])

    // join

    const [joinRequest, setJoinRequest] = useState<{ ammInfo: any, request: JoinAmmPoolRequest }>();

    const handleJoinIn = React.useCallback(async (data, type, joinFees, ammPoolSnapshot, tokenMap, account) => {
        setAmmDepositBtnI18nKey(accountStaticCallBack(_addBtnLabel, [{ammJoinData}]))

        if (!data || !tokenMap || !data.coinA.belong || !data.coinB.belong || !ammPoolSnapshot || !joinFees || !account?.accAddress) {
            return
        }

        const {slippage} = data

        const slippageReal = sdk.toBig(slippage).div(100).toString()

        const isAtoB = type === 'coinA'

        const {idIndex, marketArray, marketMap,} = store.getState().tokenMap

        const {ammMap} = store.getState().amm.ammMap

        const {market, amm} = getExistedMarket(marketArray, data.coinA.belong as string,
            data.coinB.belong as string)

        if (!market || !amm || !marketMap) {
            return
        }

        myLog('handleJoinInDebounce', data, type);

        const marketInfo: MarketInfo = marketMap[ market ]

        const ammInfo: any = ammMap[ amm as string ]

        const coinA = tokenMap[ data.coinA.belong as string ]
        const coinB = tokenMap[ data.coinB.belong as string ]

        const coinA_TV = ammPoolSnapshot.pooled[ 0 ]
        const coinB_TV = ammPoolSnapshot.pooled[ 1 ]

        const covertVal = data.coinA.tradeValue ? sdk.toBig(data.coinA.tradeValue)
            .times('1e' + isAtoB ? coinA.decimals : coinB.decimals).toFixed(0, 0) : '0'
        const {output, ratio} = sdk.ammPoolCalc(covertVal, isAtoB, coinA_TV, coinB_TV)
        const rawA = data.coinA.tradeValue ? data.coinA.tradeValue.toString() : 0;
        const rawB = data.coinB.tradeValue ? data.coinB.tradeValue.toString() : 0;
        const rawVal = isAtoB ? rawA : rawB;

        const {request} = makeJoinAmmPoolRequest(rawVal,
            isAtoB, slippageReal, account.accAddress, joinFees as LoopringMap<OffchainFeeInfo>,
            ammMap[ amm ], ammPoolSnapshot, tokenMap as any, idIndex as IdMap, 0, 0)

        if (isAtoB) {
            data.coinB.tradeValue = parseFloat(toBig(request.joinTokens.pooled[ 1 ].volume)
                .div('1e' + coinB.decimals).toFixed(marketInfo.precisionForPrice))
        } else {
            data.coinA.tradeValue = parseFloat(toBig(request.joinTokens.pooled[ 0 ].volume)
                .div('1e' + coinA.decimals).toFixed(marketInfo.precisionForPrice))
        }


        setAmmJoinData({
            coinA: data.coinA as IBData<C>,
            coinB: data.coinB as IBData<C>,
            slippage,
        })
        myLog('handleJoinInDebounce', data)
        setAmmDepositBtnI18nKey(accountStaticCallBack(_addBtnLabel, [{ammJoinData: data}]))


        setJoinRequest({
            ammInfo,
            request
        })

    }, [])

    const handleJoinAmmPoolEvent = (data: AmmData<IBData<any>>, type: 'coinA' | 'coinB') => {
        handleJoinIn(data, type, joinFees, ammPoolSnapshot, tokenMap, account)
    };

    const addToAmmCalculator = React.useCallback(async function (props
    ) {

        setJoinLoading(true)
        if (!LoopringAPI.ammpoolAPI || !LoopringAPI.userAPI || !joinRequest || !account?.eddsaKey?.sk) {
            myLog(' onAmmJoin ammpoolAPI:', LoopringAPI.ammpoolAPI,
                'joinRequest:', joinRequest)

            setToastOpen({open: true, type: 'success', content: t('labelJoinAmmFailed')})
            setJoinLoading(false)
            return
        }

        const {ammInfo, request} = joinRequest

        const patch: AmmPoolRequestPatch = {
            chainId: store.getState().system.chainId as ChainId,
            ammName: ammInfo.__rawConfig__.name,
            poolAddress: ammInfo.address,
            eddsaKey: account.eddsaKey.sk
        }

        try {

            const request2: GetNextStorageIdRequest = {
                accountId: account.accountId,
                sellTokenId: request.joinTokens.pooled[ 0 ].tokenId as number
            }
            const storageId0 = await LoopringAPI.userAPI.getNextStorageId(request2, account.apiKey)

            const request_1: GetNextStorageIdRequest = {
                accountId: account.accountId,
                sellTokenId: request.joinTokens.pooled[ 1 ].tokenId as number
            }
            const storageId1 = await LoopringAPI.userAPI.getNextStorageId(request_1, account.apiKey)

            request.storageIds = [storageId0.offchainId, storageId1.offchainId]
            setAmmJoinData({
                ...ammJoinData, ...{
                    coinA: {...ammJoinData.coinA, tradeValue: 0},
                    coinB: {...ammJoinData.coinB, tradeValue: 0},
                }
            })
            const response = await LoopringAPI.ammpoolAPI.joinAmmPool(request, patch, account.apiKey)

            myLog('join ammpool response:', response)

            if ((response.joinAmmPoolResult as any)?.resultInfo) {
                setToastOpen({open: true, type: 'error', content: t('labelJoinAmmFailed')})
                setJoinLoading(false)
            } else {
                setToastOpen({open: true, type: 'success', content: t('labelJoinAmmSuccess')})
                walletLayer2Service.sendUserUpdate()
            }

        } catch (reason) {
            dumpError400(reason)
            setJoinLoading(false)
            setToastOpen({open: true, type: 'error', content: t('labelJoinAmmFailed')})
        } finally {
        }
        if (props.__cache__) {
            makeCache(props.__cache__)
        }
    }, [joinRequest, ammJoinData, account, t])

    const onAmmDepositClickMap = Object.assign(deepClone(btnClickMap), {
        [ fnType.ACTIVATED ]: [addToAmmCalculator]
    })
    const onAmmAddClick = React.useCallback((props: AmmData<IBData<any>>) => {
        accountStaticCallBack(onAmmDepositClickMap, [props])
    }, [onAmmDepositClickMap]);

    const walletLayer2Callback = React.useCallback(() => {

        if (pair && snapShotData) {
            const {walletMap} = makeWalletLayer2()
            initAmmData(pair, walletMap)
            myLog('init snapshot:', snapShotData.ammPoolsBalance)
            setAmmPoolSnapShot(snapShotData.ammPoolsBalance)
            setJoinLoading(false)
        }

    }, [pair, snapShotData])

    useWalletLayer2Socket({walletLayer2Callback})
    React.useEffect(() => {
        walletLayer2Callback()
        // if(walletLayer2Status === SagaStatus.UNSET){
        //
        // }
    }, [pair, snapShotData])
    return {
        onRefreshData: updateAmmPoolSnapshot,
        toastOpen,
        closeToast,
        ammCalcData,
        ammJoinData,
        isJoinLoading,
        handleJoinAmmPoolEvent,
        addBtnStatus,
        onAmmAddClick,
        ammDepositBtnI18nKey,

    }
}
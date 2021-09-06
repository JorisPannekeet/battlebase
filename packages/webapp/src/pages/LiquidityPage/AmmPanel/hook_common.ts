import React from "react";
import {
    AccountStatus,
    CoinInfo,
} from '@loopring-web/common-resources';
import { useTokenMap, } from '../../../stores/token';
import { useAmmMap } from '../../../stores/Amm/AmmMap';
import * as sdk from 'loopring-sdk';
import { useAccount } from '../../../stores/account/hook';
import { LoopringAPI } from "api_wrapper";
import { myLog } from "@loopring-web/common-resources";
import { useSocket, } from "stores/socket";
import { useToast } from "hooks/common/useToast";
import { usePageAmmPool } from "stores/router";

export const useAmmCommon = ({pair,}: {
    pair: {
        coinAInfo: CoinInfo<string> | undefined,
        coinBInfo: CoinInfo<string> | undefined
    },
}) => {

    const {toastOpen, setToastOpen, closeToast,} = useToast()

    const {sendSocketTopic, socketEnd} = useSocket()

    const {account} = useAccount()

    const {marketArray, marketMap,} = useTokenMap();
    const {ammMap} = useAmmMap();

    const {
        updatePageAmmCommon,
    } = usePageAmmPool()

    const updateAmmPoolSnapshot = React.useCallback(async () => {

        if (!pair?.coinAInfo?.simpleName || !pair?.coinBInfo?.simpleName || !LoopringAPI.ammpoolAPI) {
            return
        }

        const {market, amm} = sdk.getExistedMarket(marketArray, pair.coinAInfo.simpleName as string,
            pair.coinBInfo.simpleName as string)

        if (!market || !amm || !marketMap || !ammMap || !ammMap[ amm as string ]) {
            return
        }

        const ammInfo: any = ammMap[ amm as string ]

        const request1: sdk.GetAmmPoolSnapshotRequest = {
            poolAddress: ammInfo.address
        }

        const response = await LoopringAPI.ammpoolAPI.getAmmPoolSnapshot(request1)

        if (!response) {
            myLog('err res:', response)
            return
        }

        const {ammPoolSnapshot} = response

        updatePageAmmCommon({
            ammInfo, ammPoolSnapshot,
        })

    }, [pair, marketArray, ammMap, updatePageAmmCommon])

    React.useEffect(() => {
        if (pair?.coinBInfo?.simpleName) {
            updateAmmPoolSnapshot()
        }
    }, [updateAmmPoolSnapshot, pair?.coinBInfo?.simpleName])

    React.useEffect(() => {
        if (account.readyState === AccountStatus.ACTIVATED) {
            sendSocketTopic({[ sdk.WsTopicType.account ]: true});
        } else {
            socketEnd()
        }
        return () => {
            socketEnd()
        }
    }, [account.readyState]);

    const refreshRef = React.createRef()

    React.useEffect(() => {
        if (refreshRef.current && pair) {
            // @ts-ignore
            refreshRef.current.firstElementChild.click();
        }

    }, []);

    return {
        toastOpen,
        setToastOpen,
        closeToast,
        refreshRef,
        updateAmmPoolSnapshot,
    }

}

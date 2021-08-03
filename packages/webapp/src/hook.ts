import React from 'react';
import { useCustomDCEffect } from 'hooks/common/useCustomDCEffect';
import { useSystem } from './stores/system';
import { ChainId, dumpError400, sleep } from 'loopring-sdk';
import { useAmmMap } from './stores/Amm/AmmMap';
import { Account, AccountStatus, SagaStatus } from '@loopring-web/common-resources';
import { useTokenMap } from './stores/token';
import { useWalletLayer1 } from './stores/walletLayer1';
import { useAccount } from './stores/account/hook';
import { connectProvides, ErrorType, useConnectHook } from '@loopring-web/web3-provider';
import { useOpenModals, WalletConnectStep } from '@loopring-web/component-lib';
import { LoopringAPI } from './stores/apis/api';
import { unlockAccount } from './services/account/unlockAccount';
import { myLog } from './utils/log_tools';
import { lockAccount } from './services/account/lockAccount';
import { activeAccount } from './services/account/activeAccount';
import { useAccountHook } from './services/account/useAccountHook';
import { walletLayer2Services } from './services/account/walletLayer2Services';
import { checkAccount } from './services/account/checkAccount';

/**
 * @description
 * @step1 subscribe Connect hook
 * @step2 check the session storage ? choose the provider : none provider
 * @step3 decide china Id by step2
 * @step4 prepare the static date (tokenMap, ammMap, faitPrice, gasPrice, forex, Activities ...)
 * @step5 launch the page
 * @todo each step has error show the ErrorPage , next version for service maintain page.
 */

export function useInit() {
    const [state, setState] = React.useState<keyof typeof SagaStatus>('PENDING')
    // const systemState = useSystem();
    const tokenState = useTokenMap();
    const ammMapState = useAmmMap();
    const {
        updateSystem,

        status: systemStatus,
        statusUnset: systemStatusUnset
    } = useSystem();
    const {account,} = useAccount();
    const walletLayer1State = useWalletLayer1();
    useConnectHandle();
    useCustomDCEffect(async () => {
        // TODO getSessionAccount infor
        if (account.accAddress && account.connectName && account.connectName !== 'UnKnown' && account.accAddress) {
            try {
                await connectProvides[ account.connectName ]();
                if (connectProvides.usedProvide) {
                    const chainId = Number(await connectProvides.usedWeb3?.eth.getChainId());

                    //LoopringAPI.InitApi(chainId)

                    updateSystem({chainId: (chainId && chainId === ChainId.GORLI ? chainId as ChainId : ChainId.MAINNET)})
                    return
                }
            } catch (error) {
                console.log(error)
            }
        } else if (account.chainId) {
            updateSystem({chainId: account.chainId})
        } else {
            updateSystem({chainId: ChainId.MAINNET})
        }

        //TEST:
        // await connectProvides.MetaMask();
        // if (connectProvides.usedProvide) {
        //     // @ts-ignore
        //     const chainId = Number(await connectProvides.usedProvide.request({method: 'eth_chainId'}))
        //     // // @ts-ignore
        //     //const accounts = await connectProvides.usedProvide.request({ method: 'eth_requestAccounts' })
        //     systemState.updateSystem({chainId: (chainId ? chainId as ChainId : ChainId.MAINNET)})
        //     return
        // }


    }, [])
    React.useEffect(() => {
        switch (systemStatus) {
            case "ERROR":
                systemStatusUnset();
                setState('ERROR')
                //TODO show error at button page show error  some retry dispat again
                break;
            case "DONE":
                systemStatusUnset();
                break;
            default:
                break;
        }
    }, [systemStatus, systemStatusUnset]);
    React.useEffect(() => {
        if (ammMapState.status === "ERROR" || tokenState.status === "ERROR") {
            //TODO: solve errorx
            ammMapState.statusUnset();
            tokenState.statusUnset();
            setState('ERROR');
        } else if (ammMapState.status === "DONE" && tokenState.status === "DONE") {
            ammMapState.statusUnset();
            tokenState.statusUnset();
            setState('DONE');
        }
    }, [ammMapState, tokenState, account.accountId, walletLayer1State])

    return {
        state,
    }
}

function useConnectHandle() {
    const {account, updateAccount, shouldShow, resetAccount, statusUnset: statusAccountUnset} = useAccount();
    const {
        updateSystem,
        chainId: _chainId,
    } = useSystem();
    const handleConnect = React.useCallback(async ({
                                                       accounts,
                                                       chainId,
                                                       provider
                                                   }: { accounts: string, provider: any, chainId: ChainId | 'unknown' }) => {
        const accAddress = accounts[ 0 ];
        const {setShowConnect, setShowAccount} = useOpenModals();
        const {
            updateSystem,
            chainId: _chainId,
            exchangeInfo,
            status: systemStatus,
            statusUnset: systemStatusUnset
        } = useSystem();
        // await handleChainChanged(chainId)
        if (chainId !== _chainId && _chainId !== 'unknown' && chainId !== 'unknown') {
            chainId === 5 ? updateAccount({chainId}) : updateAccount({chainId: 1})
            updateSystem({chainId});
            window.location.reload();
        } else if (chainId == 'unknown') {
            const _account: Partial<Account> = lockAccount({readyState: AccountStatus.NO_ACCOUNT, wrongChain: true,})
            updateAccount({..._account});
        }
        checkAccount(accAddress);

        setShowConnect({isShow: shouldShow ?? false, step: WalletConnectStep.SuccessConnect});
        await sleep(1000)
        setShowConnect({isShow: false, step: WalletConnectStep.SuccessConnect});



    }, [_chainId, account, shouldShow])

    const handleAccountDisconnect = React.useCallback(async () => {
        if (account && account.accAddress) {
            resetAccount();
            statusAccountUnset();
            myLog('Disconnect and clear')
        } else {
            myLog('Disconnect with no account')
        }

    }, [account]);

    const handleError = React.useCallback(async ({type, errorObj}: { type: keyof typeof ErrorType, errorObj: any }) => {
        updateSystem({chainId: account.chainId ? account.chainId : 1})
        resetAccount();
        await sleep(10);
        statusAccountUnset();
        myLog('Error')
    }, [account]);

    useConnectHook({handleAccountDisconnect, handleError, handleConnect});

}

function useAccountHandle() {
    const {account, updateAccount, shouldShow, resetAccount, statusUnset: statusAccountUnset} = useAccount();
    const handleLockAccount = React.useCallback(()=>{},[])
    const handleNoAccount = React.useCallback(()=>{},[])
    const handleDepositingAccount = React.useCallback(()=>{},[])
    const handleErrorApproveToken = React.useCallback(()=>{},[])
    const handleErrorDepositSign = React.useCallback(()=>{},[])
    const handleProcessDeposit = React.useCallback(()=>{},[])
    const handleSignAccount = React.useCallback(()=>{},[])
    const handleSignError = React.useCallback(()=>{},[])

    const handleProcessSign = React.useCallback(()=>{},[])
    const handleProcessAccountCheck = React.useCallback(()=>{},[])
    useAccountHook({
        handleLockAccount,// clear private data
        handleNoAccount,//
        // TODO
        //  step1 Approve account;  click allow from provider
        //  step2 send to ETH;  click allow from provider
        handleDepositingAccount,
        handleErrorApproveToken,
        handleErrorDepositSign,
        handleProcessDeposit,// two or one step
        handleSignAccount, //unlock or update account  assgin
        handleProcessSign,
        handleSignError,
        handleProcessAccountCheck
    })
}


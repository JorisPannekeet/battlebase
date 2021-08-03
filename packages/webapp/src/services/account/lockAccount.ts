import { AccountStatus } from '@loopring-web/common-resources';
import store from '../../stores';
import { walletLayer2Services } from './walletLayer2Services';
import { updateAccountStatus } from '../../stores/account';

export function lockAccount() {
    const account = store.getState().account;
    walletLayer2Services.sendAccountLock(account.accountId)
    store.dispatch(updateAccountStatus({
        readyState: AccountStatus.LOCKED,
        apiKey: '',
        eddsaKey: '',
        publicKey: '',
    }))
}
export function goErrorNetWork(){
    store.dispatch(updateAccountStatus({
        readyState: AccountStatus.ERROR_NETWORK,
        apiKey: '',
        eddsaKey: '',
        publicKey: '',
    }))
}
export function cleanLayer2() {
    store.dispatch(updateAccountStatus({
        account: -1,
        readyState: AccountStatus.UN_CONNECT,
        apiKey: '',
        eddsaKey: '',
        publicKey: '',
    }))
}
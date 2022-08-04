import { Contract, WalletConnection, connect, keyStores } from 'near-api-js';

import environment from './config';
import { formatNearAmount } from 'near-api-js/lib/utils/format';

const nearEnv = environment('testnet');

export async function initializeContract() {
  // We create a near object that we will use to interact with the NEAR network.
  // It holds a keyStore object that stores the wallet information
  // which is stored in the browser's local storage.

  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearEnv
    )
  );

  // Then we create a WalletConnection object that we will use to interact with the wallet.
  // To sign in, sign out, get the account ID, and get the account balance.

  window.walletConnection = new WalletConnection(near);
  window.accountId = window.walletConnection.getAccountId();

  // We create a Contract object that we will use to interact with the smart contract.
  // We pass the account, the name of the smart contract,
  // and the methods that we want to use to the constructor.

  window.contract = new Contract(
    window.walletConnection.account(),
    nearEnv.contractName,
    {
      viewMethods: ['getProduct', 'getProducts'],
      changeMethods: ['buyProduct', 'setProduct'],
    }
  );
}

export async function accountBalance() {
  return formatNearAmount(
    (await window.walletConnection.account().getAccountBalance()).total,
    2
  );
}

export async function getAccountId() {
  return window.walletConnection.getAccountId();
}

export function login() {
  window.walletConnection.requestSignIn(nearEnv.contractName);
}

export function logout() {
  window.walletConnection.signOut();
  window.location.reload();
}

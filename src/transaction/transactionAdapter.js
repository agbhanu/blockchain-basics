import {BitcoinTransaction} from './bitcoinTransaction'
import {EthereumTransaction} from './etherTransaction'
import * as constants from '../constants'

export async function TransactionAdapter(coinName, senderPrivateKey, senderAddress, recieverAddress) {

    if(!constants.CoinAddressMap.hasOwnProperty(coinName)){
        throw new Error('Not a valid coin name');
    }

    const txHash = await constants.CoinTransactionMap[coinName](senderPrivateKey,senderAddress,recieverAddress);
    return txHash;
}

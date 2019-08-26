import {createBitcoinTransaction} from './bitcoinTransaction'
import {createEthereumTransaction} from './etherTransaction'
import {CoinTransactionMap} from '../constants'

export async function TransactionAdapter(coinName, senderPrivateKey, senderAddress, recieverAddress) {

    if(!CoinTransactionMap.hasOwnProperty(coinName)){
        throw new Error('Not a valid coin name');
    }

    const txHash = await CoinTransactionMap[coinName](senderPrivateKey,senderAddress,recieverAddress);
    return txHash;
}

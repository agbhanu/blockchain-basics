import {BitcoinTransaction} from './bitcoinTransaction'
import {EthereumTransaction} from './etherTransaction'

// enum to reperesent different coin types
const CoinName = Object.freeze({
    BITCOIN: 'Bitcoin',
    ETHER: 'Ether'
})

export async function TransactionAdapter(coinName, senderPrivateKey, senderAddress, recieverAddress) {

    let txHash;
    if (coinName === CoinName.BITCOIN) {
        txHash = await BitcoinTransaction().createTransaction(senderPrivateKey,senderAddress,recieverAddress)
    }
    else if (coinName === CoinName.ETHER) {
        txHash = await EthereumTransaction().createTransaction(senderPrivateKey,senderAddress,recieverAddress)
    }
    return txHash;
}

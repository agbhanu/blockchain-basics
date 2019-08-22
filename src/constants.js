import {BitcoinAddress} from './address/bitcoinAddress'
import {EthereumAddress} from './address/ethereumAddress'
import { BitcoinTransaction } from './transaction/bitcoinTransaction';
import { EthereumTransaction } from './transaction/etherTransaction';

export const CoinAddressMap = Object.freeze({
    'Bitcoin' : BitcoinAddress().getAddressFromPublicKey,
    'Ether' : EthereumAddress().getAddressFromPublicKey,
    
})

export const CoinTransactionMap = Object.freeze({
    'Bitcoin' : BitcoinTransaction().createTransaction,
    'Ether' : EthereumTransaction().createTransaction,
    
})

export const CoinName = Object.freeze({
    1: 'Bitcoin',
    2: 'Ether',
    default: null
})
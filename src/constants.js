import {getBitcoinAddressFromPublicKey} from './address/bitcoinAddress'
import {getEthereumAddressFromPublicKey} from './address/ethereumAddress'
import { createBitcoinTransaction } from './transaction/bitcoinTransaction';
import { createEthereumTransaction } from './transaction/etherTransaction';
import dotenv from 'dotenv'
dotenv.config()

export const DUST_VALUE = 600
export const BITCOIN = 'Bitcoin'
export const ETHER = 'Ether'
export const SATOSHIS = 'satoshis'
export const ETHEREUM_NETWORK = process.env.BLOCKCHAIN_ENV==="Development" ? 'rinkeby' : 'mainnet'
export const BITCOIN_NETWORK = process.env.BLOCKCHAIN_ENV==="Development" ? 'testnet' : 'mainnet'

export const CoinAddressMap = Object.freeze({
    [BITCOIN] : getBitcoinAddressFromPublicKey,
    [ETHER] : getEthereumAddressFromPublicKey,
    
})

export const CoinTransactionMap = Object.freeze({
    [BITCOIN] : createBitcoinTransaction,
    [ETHER] : createEthereumTransaction,
    
})

export const CoinName = Object.freeze({
    1: BITCOIN,
    2: ETHER,
    default: null
})

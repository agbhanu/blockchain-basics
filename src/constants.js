import { getBitcoinAddressFromPublicKey } from './address/bitcoinAddress'
import { getEthereumAddressFromPublicKey } from './address/ethereumAddress'
import { createBitcoinTransaction } from './transaction/bitcoinTransaction';
import { createEthereumTransaction } from './transaction/etherTransaction';
import dotenv from 'dotenv'
dotenv.config()

export const DUST_VALUE = 600;
export const BITCOIN = 'Bitcoin';
export const ETHER = 'Ether';
export const BITCOIN_VALUE = 0;
export const ETHER_VALUE = 60;
export const SATOSHIS = 'satoshis';
export const BIP32 = 'BIP32';
export const BIP44 = 'BIP44';
export const EXTERNAL = 0;
export const INTERNAL = 1;
export const NEW_MNEMONIC = 'New Mnemonic';
export const EXISTING_MNEMONIC = 'Existing Mnemonic';
export const ETHEREUM_NETWORK = process.env.BLOCKCHAIN_ENV === "Development" ? 'rinkeby' : 'mainnet'
export const BITCOIN_NETWORK = process.env.BLOCKCHAIN_ENV === "Development" ? 'testnet' : 'mainnet'

export const MnemonicOption = Object.freeze({
    1: NEW_MNEMONIC,
    2: EXISTING_MNEMONIC,
    default: 'Not Valid Option'
})

export const CoinAddressMap = Object.freeze({
    [BITCOIN]: getBitcoinAddressFromPublicKey,
    [ETHER]: getEthereumAddressFromPublicKey,

})

export const CoinTransactionMap = Object.freeze({
    [BITCOIN]: createBitcoinTransaction,
    [ETHER]: createEthereumTransaction,

})

export const CoinName = Object.freeze({
    1: BITCOIN,
    2: ETHER,
    default: null
})

export const AlgoOption = Object.freeze({
    1: BIP32,
    2: BIP44,
    default: BIP32
})

export const ChainNameOption = Object.freeze({
    1: EXTERNAL,
    2: INTERNAL,
    default: EXTERNAL
})

export const CoinType = Object.freeze({
    1 : BITCOIN_VALUE,
    2 : ETHER_VALUE,
    default : BITCOIN_VALUE
})
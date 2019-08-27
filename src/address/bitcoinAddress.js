import * as bitcoin from 'bitcoinjs-lib'
import {BITCOIN_ADDRESS_NETWORK} from '../constants'

export const getBitcoinAddressFromPublicKey = (publicKey) => {
  const { address } = bitcoin.payments.p2pkh({
    pubkey: publicKey,
    network: BITCOIN_ADDRESS_NETWORK
  });
  return address;
}

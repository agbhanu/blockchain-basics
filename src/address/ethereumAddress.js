import publicKeyToAddress from 'ethereum-public-key-to-address'

export function EthereumAddress() {

  return {
    getAddressFromPublicKey: (publicKey) => {
      return publicKeyToAddress(Buffer.from(publicKey, 'hex'));
    }
  };
}

import publicKeyToAddress from 'ethereum-public-key-to-address'

export const getEthereumAddressFromPublicKey = (publicKey) => {
  return publicKeyToAddress(Buffer.from(publicKey, 'hex'));
}

const publicKeyToAddress = require('ethereum-public-key-to-address')

function EthereumAddress() {

  return {
    getAddressFromPublicKey: (publicKey) => {
      return publicKeyToAddress(Buffer.from(publicKey, 'hex'));
    }
  };
}

module.exports = {
  EthereumAddress : EthereumAddress
}
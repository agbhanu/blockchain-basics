const { AddressAdapter } = require('./addressAdapter')
const { BitcoinAddress } = require('./bitcoinAddress')
const { EthereumAddress } = require('./ethereumAddress')

const addAddressInChildKeyPairArray = (coinName, childKeyPairArray) => {

    childKeyPairArray.forEach((keyPair) => {
        let address;
        let publicKey = keyPair.childKeyPair.publicKey;
        if (coinName === 'Bitcoin') {
            address = AddressAdapter(BitcoinAddress(), publicKey);
        }
        else if (coinName === 'Ether') {
            address = AddressAdapter(EthereumAddress(), publicKey);
        }
        keyPair['address'] = address;
    })
    return childKeyPairArray;
}

module.exports = {
    addAddressInChildKeyPairArray : addAddressInChildKeyPairArray
}
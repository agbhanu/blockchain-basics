const { BitcoinAddress } = require('./bitcoinAddress')
const { EthereumAddress } = require('./ethereumAddress')

// enum to reperesent different coin types
const CoinName = Object.freeze({
    BITCOIN: 'Bitcoin',
    ETHER: 'Ether'
})

function AddressAdapter(coinName, childKeyPairArray) {

    let childKeyPairArrayWithAddress = childKeyPairArray.map((keyPair) => {
        let address;
        let publicKey = keyPair.childKeyPair.publicKey;
        if (coinName === CoinName.BITCOIN) {
            address = BitcoinAddress().getAddressFromPublicKey(publicKey);
        }
        else if (coinName === CoinName.ETHER) {
            address = EthereumAddress().getAddressFromPublicKey(publicKey);
        }
        keyPair['address'] = address;
        return keyPair;
    })
    return childKeyPairArrayWithAddress;
}

module.exports = {
    AddressAdapter: AddressAdapter
}

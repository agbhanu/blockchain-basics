const { AddressAdapter } = require('./addressAdapter')

const addAddressInChildKeyPairArray = (coinName, childKeyPairArray) => {
    return AddressAdapter(coinName,childKeyPairArray);
}

module.exports = {
    addAddressInChildKeyPairArray : addAddressInChildKeyPairArray
}
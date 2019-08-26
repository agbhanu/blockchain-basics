import * as constants from '../constants'

export function AddressAdapter(coinName, childKeyPairArray) {

    const childKeyPairArrayWithAddress = childKeyPairArray.map((keyPair) => {

        const publicKey = keyPair.childKeyPair.publicKey;

        // check user choose correct coin name
        if(!constants.CoinAddressMap.hasOwnProperty(coinName)){
            throw new Error('Not a valid coin name');
        }

        const address = constants.CoinAddressMap[coinName](publicKey);
        keyPair['address'] = address;
        return keyPair;
    })
    return childKeyPairArrayWithAddress;
}

import HDKey from 'hdkey'
import * as userInput from './userInput'

export const createParentKeyPair = (seedKey) => {

    const masterKeyObj = HDKey.fromMasterSeed(Buffer.from(seedKey.toString(), 'hex'));
    return masterKeyObj;
}

export const generateChildKeyPairs = (parentKeyPair) => {

    const childKeyPairArray = [];
    const algoOption = userInput.getAlgoOption();
    const derivePath = userInput.getDerivePath(algoOption);


    for (let addressIndex = 0; addressIndex < 10; addressIndex += 1) {

        let childKeyPairAndDerivePathObj = {};
        childKeyPairAndDerivePathObj['childKeyPair'] = parentKeyPair.derive(derivePath + addressIndex);
        childKeyPairAndDerivePathObj['derivePath'] = derivePath + addressIndex;
        childKeyPairAndDerivePathObj['addressIndex'] = addressIndex;
        childKeyPairArray.push(childKeyPairAndDerivePathObj);
    }
    return childKeyPairArray;
}

export const printChildKeyPairArray = (childKeyPairArray) => {

    const length = childKeyPairArray.length;
    for (let index = 0; index < length; index += 1) {
        const childKeyPairObj = childKeyPairArray[index];
        console.log('Derive Path :'+ childKeyPairObj.derivePath);
        console.log('Private key : '+ childKeyPairObj.childKeyPair.privateExtendedKey);
        console.log('Public Key : '+ childKeyPairObj.childKeyPair.publicExtendedKey);
        console.log('Address : '+ childKeyPairObj.address);
        console.log('------------------------------------------------------------------------------');
    }
}

const HDKey = require('hdkey')
const readline = require('readline-sync')
const seed = require('./seed')
const mnemonic = require('./mnemonic')

const createParentKeyPair = (seedKey) => {

    let masterKeyObj = HDKey.fromMasterSeed(Buffer.from(seedKey.toString(), 'hex'));
    return masterKeyObj;
}

const generateChildKeyPairs = (parentKeyPair) => {

    let childKeyPairArray = [];
    let derivePath;
    let algoOption = getAlgoOption();

    if (algoOption == 1) {
        derivePath = readline.question("Enter derive path value \n sample format : (m/44/0/0/0/) \n");
    }
    else {
        derivePath = getDerivePath();
    }

    for (let addressIndex = 0; addressIndex < 10; addressIndex += 1) {

        let childKeyPairAndDerivePathObj = {};
        childKeyPairAndDerivePathObj['childKeyPair'] = parentKeyPair.derive(derivePath + addressIndex);
        childKeyPairAndDerivePathObj['derivePath'] = derivePath + addressIndex;
        childKeyPairAndDerivePathObj['addressIndex'] = addressIndex;
        childKeyPairArray.push(childKeyPairAndDerivePathObj);
    }
    return childKeyPairArray;
}

const printChildKeyPairArray = (childKeyPairArray) => {

    let length = childKeyPairArray.length;
    for (let index = 0; index < length; index += 1) {
        let childKeyPairObj = childKeyPairArray[index];
        console.log('Derive Path :'+ childKeyPairObj.derivePath);
        console.log('Private key : '+ childKeyPairObj.childKeyPair.privateExtendedKey);
        console.log('Public Key : '+ childKeyPairObj.childKeyPair.publicExtendedKey);
        console.log('Address : '+ childKeyPairObj.address);
        console.log('------------------------------------------------------------------------------');
    }
}

const getName = () => {

    const option = readline.question("Choose (Default : Bitcoin) \n 1. Bitcoin \n 2. Ethereum \n");
    if (option == 2)
        return 'Ether';
    return 'Bitcoin';
}

const getAlgoOption = () => {

    const algoOption = readline.question("Choose (Default : BIP32) \n 1. BIP32 \n 2. BIP44 \n");
    if (algoOption == 2)
        return 2;
    return 1;
}
const getCoinType = () => {

    let cointType;
    cointType = readline.question("Choose (Default : BitCoin) \n 1. BitCoinn \n 2. Ethereum \n");
    if (cointType == 1)
        return 0;
    else if (cointType == 2)
        return 60;
    return 0;
}

const getAccountNo = () => {
    let accountNo = readline.question("Enter Account Number Index:");
    return accountNo;
}

const getChainName = () => {
    let chainNameOption = readline.question("Choose (Default : External) \n 1. External(0) \n 2. Internal(1) \n");

    if (chainNameOption == 2)
        return 1;
    return 0;
}

const getDerivePath = () => {
    let coinType = getCoinType();
    let accountNo = getAccountNo();
    let chainName = getChainName();
    let derivePath = 'm/44/' + coinType + '/' + accountNo + '/' + chainName + '/';
    return derivePath;
}

module.exports = {
    createParentKeyPair,
    generateChildKeyPairs,
    printChildKeyPairArray
}

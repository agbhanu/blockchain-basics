const readline = require('readline-sync')

const getOptionForMnemonic = () => {

    const option = readline.question("Choose Option \n 1. Create new mnemonic \n 2. Use existing mnemonic\n");
    return option;
}

const getExistingMnemonic = () => {

    const userMnemonic = readline.question("Enter existing mnemonic \n");
    return userMnemonic;
}

const getCoinName = () => {

    const option = readline.question("Choose (Default : Bitcoin) \n 1. Bitcoin \n 2. Ether \n");
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

const getDerivePath = (algoOption) => {

    let derivePath;
    
    if (algoOption == 1) {
        derivePath = readline.question("Enter derive path value \n sample format : (m/44/0/0/0/) \n");
    }
    else {
        let coinType = getCoinType();
        let accountNo = getAccountNo();
        let chainName = getChainName();
        let derivePath = 'm/44/' + coinType + '/' + accountNo + '/' + chainName + '/';
        derivePath = getDerivePath();
    }
    return derivePath;
}

module.exports = {
    getCoinName: getCoinName,
    getOptionForMnemonic: getOptionForMnemonic,
    getExistingMnemonic: getExistingMnemonic,
    getAlgoOption: getAlgoOption,
    getCoinType: getCoinType,
    getAccountNo: getAccountNo,
    getChainName: getChainName,
    getDerivePath: getDerivePath
}

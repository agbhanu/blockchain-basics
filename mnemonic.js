const Mnemonic = require('bitcore-mnemonic');
const readline = require('readline-sync');

let mnemonic;

// generate random mnemonic
const getMnemonic = (option) => {
    mnemonic = new Mnemonic();
    return mnemonic;
}

// check mnemonic is valid or not
let isValidMnemonicOrNot = (dummyCode) => {
    return Mnemonic.isValid(dummyCode);
}

module.exports = {
    getMnemonic,
    isValidMnemonicOrNot
}

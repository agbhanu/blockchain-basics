const Mnemonic = require('bitcore-mnemonic');

let mnemonic;

// generate random mnemonic
const getMnemonic = (option) => {
    mnemonic = new Mnemonic();
    return mnemonic;
}

// check mnemonic is valid or not
let isValidMnemonicOrNot = (mnemonicCode) => {
    return Mnemonic.isValid(mnemonicCode);
}

module.exports = {
    getMnemonic,
    isValidMnemonicOrNot
}

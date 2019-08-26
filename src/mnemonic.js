import Mnemonic from 'bitcore-mnemonic'

// generate random mnemonic
export const getMnemonic = (option) => {
    const mnemonic = new Mnemonic();
    return mnemonic;
}

// check mnemonic is valid or not
export const isValidMnemonicOrNot = (mnemonicCode) => {
    return Mnemonic.isValid(mnemonicCode);
}

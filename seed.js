const Mnemonic = require('bitcore-mnemonic');
const userInput = require('./userInput')

const generateSeed = (mnemonicCode) => {

    const userOption = userInput.getOptionForPassphrase();
    let seed;
    if(userOption === 'yes'){
        const passphrase = userInput.getPassphrase();
        seed = new Mnemonic(mnemonicCode).toHDPrivateKey(passphrase);
    }
    else{
        seed = new Mnemonic(mnemonicCode).toHDPrivateKey();
    }

    return seed;
}

module.exports = {
    generateSeed
}

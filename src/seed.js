import Mnemonic from 'bitcore-mnemonic'
import * as userInput from './userInput'

export const generateSeed = (mnemonicCode) => {

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

const Mnemonic = require('bitcore-mnemonic');
const readline = require('readline-sync')
const mnemonic = require('./mnemonic');


const getUserOption = () => {
    const userOption = readline.question("Do you want to add passphrase(y/n) Defualt : yes \n ");
    if (userOption == 'y' || userOption == 'Y' || userOption == 'yes' || userOption == 'YES')
        return 'yes';
    return 'no';
}

const generateSeed = (mnemonicCode) => {

    const userOption = getUserOption();
    let passphrase = '';
    let seed;
    if(userOption == 'yes'){
        passphrase = readline.question("Enter passphrase : ");
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

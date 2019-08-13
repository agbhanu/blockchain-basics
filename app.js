const readline = require('readline-sync');
const mnemonic = require('./mnemonic')
const seed = require('./seed')
const keyPair = require('./keyPair')
const {getName} = require('./utility')
const {createTransaction} = require('./transaction')
const {addAddressInChildKeyPairArray} = require('./address')

let mnemonicCode = null;
let seedKey;
let passphrase;
let parentKeyPair;

const entryPoint = async () => {
    const option = readline.question("Choose Option \n 1. Create new mnemonic \n 2. Use existing mnemonic\n");
    
    // Generate new mnemonic
    if (option == 1) {
        mnemonicCode = mnemonic.getMnemonic().toString();
        console.log("Mnemonic created : "+mnemonicCode);
    }

    // use exisiting mnemonic
    else if (option == 2) {
        userMnemonic = readline.question("Enter existing mnemonic \n");
        if (mnemonic.isValidMnemonicOrNot(userMnemonic)) {
            mnemonicCode = userMnemonic;

            // generate seed
            seedKey = seed.generateSeed(mnemonicCode);

            // generate root/parent key pair
            parentKeyPair = keyPair.createParentKeyPair(seedKey);
            console.log("Parent private key : " + parentKeyPair.privateExtendedKey);
            console.log("Parent public key : " + parentKeyPair.publicExtendedKey);

            // generate child key pairs
            const childKeyPairArray = keyPair.generateChildKeyPairs(parentKeyPair);

            const coinName = getName();

            // add address property to childKeyPairObject array
            const childKeyPairwithAddressArray = addAddressInChildKeyPairArray(coinName,childKeyPairArray);
            
            // print keys, address and derive path
            keyPair.printChildKeyPairArray(childKeyPairwithAddressArray);

            const senderPrivateKey = childKeyPairwithAddressArray[0].childKeyPair.privateKey;
            const senderAddress = childKeyPairwithAddressArray[0].address;
            const receiverAddress = childKeyPairwithAddressArray[1].address;

            // create tx to send ether/bitcoin from one address to another
            const txHash = await createTransaction(coinName,senderPrivateKey,senderAddress,receiverAddress);
            console.log(`transaction created successfully : ${txHash}`);
        }
        else {
            console.log("Not a vaild mnemonic")
        }
    }

    else {
        console.log("Please choose valid option");
    }
}

entryPoint()

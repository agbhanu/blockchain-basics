const mnemonic = require('./mnemonic')
const seed = require('./seed')
const keyPair = require('./keyPair')
const userInput = require('./userInput')
const { createTransaction } = require('./transaction')
const { addAddressInChildKeyPairArray } = require('./address')

const entryPoint = async () => {

    let mnemonicCode;
    const option = userInput.getOptionForMnemonic();
    // Generate new mnemonic
    if (option === 1) {
        mnemonicCode = mnemonic.getMnemonic().toString();
        console.log("Mnemonic created : " + mnemonicCode);
    }

    // use exisiting mnemonic
    else if (option === 2) {
        mnemonicCode = userInput.getExistingMnemonic();

        if (mnemonic.isValidMnemonicOrNot(mnemonicCode)) {

            // generate seed
            const seedKey = seed.generateSeed(mnemonicCode);

            // generate root/parent key pair
            const parentKeyPair = keyPair.createParentKeyPair(seedKey);
            console.log("Parent private key : " + parentKeyPair.privateExtendedKey);
            console.log("Parent public key : " + parentKeyPair.publicExtendedKey);

            // generate child key pairs
            const childKeyPairArray = keyPair.generateChildKeyPairs(parentKeyPair);

            const coinName = userInput.getCoinName();

            // add address property to childKeyPairObject array
            const childKeyPairwithAddressArray = addAddressInChildKeyPairArray(coinName, childKeyPairArray);

            // print keys, address and derive path
            keyPair.printChildKeyPairArray(childKeyPairwithAddressArray);

            const senderPrivateKey = childKeyPairwithAddressArray[0].childKeyPair.privateKey;
            const senderAddress = childKeyPairwithAddressArray[0].address;
            const receiverAddress = childKeyPairwithAddressArray[1].address;

            // create tx to send ether/bitcoin from one address to another
            try {
                const txHash = await createTransaction(coinName, senderPrivateKey, senderAddress, receiverAddress);
                console.log(`transaction created successfully : ${txHash}`);
            } catch (err) {
                console.log(err);
            }
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

import * as mnemonic from './mnemonic'
import * as seed from './seed'
import * as keyPair from './keyPair'
import * as userInput from './userInput'
import { createTransaction } from './transaction'
import { addAddressInChildKeyPairArray } from './address'
import { NEW_MNEMONIC, EXISTING_MNEMONIC } from './constants'

const entryPoint = async () => {

    let mnemonicCode;
    const option = userInput.getOptionForMnemonic();
    // Generate new mnemonic
    if (option === NEW_MNEMONIC) {
        mnemonicCode = mnemonic.getMnemonic().toString();
        console.log("Mnemonic created : " + mnemonicCode);
    }

    // use exisiting mnemonic
    else if (option === EXISTING_MNEMONIC) {
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
            try {
                const childKeyPairwithAddressArray = addAddressInChildKeyPairArray(coinName, childKeyPairArray);
                // print keys, address and derive path
                keyPair.printChildKeyPairArray(childKeyPairwithAddressArray);

                const senderPrivateKey = childKeyPairwithAddressArray[0].childKeyPair.privateKey;
                const senderAddress = childKeyPairwithAddressArray[0].address;
                const receiverAddress = childKeyPairwithAddressArray[1].address;
                // create tx to send ether/bitcoin from one address to another
                const txHash = await createTransaction(coinName, senderPrivateKey, senderAddress, receiverAddress);
                console.log(`transaction created successfully : ${txHash}`);
            } catch (err) {
                console.log(err.message);
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

import * as bitcoin from 'bitcoinjs-lib'
import bitcore from 'bitcore-lib'
import Explorer from 'bitcore-explorers'
const insight = new Explorer.Insight('testnet')
import * as userInput from '../userInput'
import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
import WAValidator from 'wallet-address-validator'


export function BitcoinTransaction() {

    return {
        createTransaction: (senderPrivateKey, senderAddress, receiverAddress) => {
            return new Promise(async (resolve, reject) => {

                let txHash;
                const privateKeyWIF = bitcore.PrivateKey.fromWIF(senderPrivateKey.toString('hex'));
                const txAmount = (userInput.getBitcoins()) * 1e8;
                let minerFee;
                try {
                    const feePerByte = await getMiningFeePerByte();
                    const txSizeInBytes = await getEstimatedTxSize(senderAddress, receiverAddress, senderPrivateKey, txAmount);
                    minerFee = txSizeInBytes * feePerByte;
                } catch (error) {
                    return reject(error);
                }
                insight.getUnspentUtxos(senderAddress, (error, utxos) => {

                    if (error) {
                        return reject(error);
                    }

                    if (utxos.length === 0) {
                        //if no transactions have happened, there is no balance on the address.
                        return reject("You don't have enough Satoshis to cover the miner fee.");
                    }

                    let balance = 0;
                    for (var i = 0; i < utxos.length; i++) {
                        balance += utxos[i]['satoshis'];
                    }

                    if ((balance - txAmount - minerFee) > 0) {

                        try {
                            let tx = bitcore.Transaction()
                            tx.from(utxos)
                            tx.to(receiverAddress, txAmount)
                            tx.change(senderAddress);
                            tx.fee(minerFee);
                            tx.sign(privateKeyWIF);

                            insight.broadcast(tx.serialize(), (err, txId) => {
                                if (err) {
                                    return reject(err);
                                }
                                //console.log(`successful broadcast : ${txId}`);
                                txHash = txId;
                                return resolve(txHash);
                            });

                        } catch (err) {
                            return reject(err);
                        }

                    } else {
                        return reject("You don't have enough Satoshis to cover the miner fee.");
                    }
                });
            })
        }
    }
}

const getEstimatedTxSize = (senderAddress, receiverAddress, senderPrivateKey, txAmount) => {

    return new Promise((resolve, reject) => {
        const validSenderAddress = WAValidator.validate(senderAddress, 'BTC', 'testnet')
        const validReceiverAddress = WAValidator.validate(receiverAddress, 'BTC', 'testnet');
        if (validSenderAddress && validReceiverAddress) {
            insight.getUnspentUtxos(senderAddress, (error, utxos) => {

                console.log(utxos);
                if (error)
                    return reject(error);


                try {
                    let tx = bitcore.Transaction();
                    tx.from(utxos)
                    tx.to(receiverAddress, txAmount)
                    tx.change(senderAddress)

                    return resolve(tx._estimateSize());
                } catch (error) {
                    return reject(error);
                }
            })
        } else {
            return reject("Sender or reciever address is not valid");
        }
    })
}

const getMiningFeePerByte = async () => {
    const feeObj = await axios.get(process.env.MINOR_FEE_CALCULATOR);
    //console.log(feeObj.data.halfHourFee);
    return feeObj.data.halfHourFee;
}

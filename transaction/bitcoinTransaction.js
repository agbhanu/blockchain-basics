const bitcoin = require('bitcoinjs-lib')
const bitcore = require('bitcore-lib')
const Explorer = require('bitcore-explorers')
const insight = new Explorer.Insight('testnet')
const userInput = require('../userInput')
const dotenv = require('dotenv').config()
const axios = require('axios')

function BitcoinTransaction() {

    return {
        createTransaction: (senderPrivateKey, senderAddress, receiverAddress) => {
            return new Promise(async (resolve, reject) => {

                // try {
                //     let privateKeyWIF = bitcore.PrivateKey.fromWIF(senderPrivateKey.toString('hex'));
                //     //const minorFee = 10000;
                //     insight.getUnspentUtxos(senderAddress, (error, utxos) => {
                //         if (error)
                //             return reject(error);

                //         if (utxos.length === 0) {
                //             //if no transactions have happened, there is no balance on the address.
                //             return reject("You don't have enough Satoshis to cover the miner fee.");
                //         }
                //         for (var i = 0; i < utxos.length; i++) {
                //             balance += utxos[i]['satoshis'];
                //         }
                //     })
                //     console.log(balance);
                //     const txAmount = (userInput.getBitcoins()) * 1e8;
                //     const feePerByte = await getMiningFeePerByte();
                //     const tx = await getTx(senderAddress, receiverAddress, senderPrivateKey, txAmount);
                //     const minoreFee = tx._estimateSize * feePerByte;
                //     console.log(tx._estimateSize);
                //     if ((balance - txAmount - minoreFee) > 0) {
                //         tx.fee(minoreFee)
                //         tx.sign(privateKeyWIF);

                //         insight.broadcast(tx.serialize(), (err, txId) => {
                //             if (err) {
                //                 return reject(err);
                //             }
                //             else {
                //                 //console.log(`successful broadcast : ${txId}`);
                //                 txHash = txId;
                //                 return resolve(txHash);
                //             }
                //         });
                //     }
                // } catch (error) {
                //     console.log(error);
                //     console.log("hhhhhhhhhhhh");
                // }


                let txHash;
                const privateKeyWIF = bitcore.PrivateKey.fromWIF(senderPrivateKey.toString('hex'));
                const txAmount = (userInput.getBitcoins()) * 1e8;
                const feePerByte = await getMiningFeePerByte();
                if (bitcoin.address.toOutputScript(senderAddress, bitcoin.networks.testnet) && bitcoin.address.toOutputScript(receiverAddress, bitcoin.networks.testnet)) {
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
                        console.log('balance:' + balance);

                        if ((balance - txAmount) > 0) {

                            try {
                                let tx = bitcore.Transaction()
                                tx.from(utxos)
                                tx.to(receiverAddress, txAmount)
                                tx.change(senderAddress);
                                tx.fee(tx._estimateSize() * feePerByte);
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
                } else {
                    return reject("Sender or reciever address is not valid");
                }
            })
        }
    }
}

const getTx = (senderAddress, receiverAddress, senderPrivateKey, txAmount) => {
    return new Promise((resolve, reject) => {
        if (bitcoin.address.toOutputScript(senderAddress, bitcoin.networks.testnet) && bitcoin.address.toOutputScript(receiverAddress)) {
            insight.getUnspentUtxos(senderAddress, (error, utxos) => {

                if (error)
                    return reject(error);


                try {
                    let tx = bitcore.Transaction();
                    tx.from(utxos)
                    tx.to(receiverAddress, txAmount)
                    tx.change(senderAddress)

                    return resolve(tx);
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

module.exports = {
    BitcoinTransaction: BitcoinTransaction
}

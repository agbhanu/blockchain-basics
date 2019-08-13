const bitcore = require('bitcore-lib')
const Explorer = require('bitcore-explorers')
const insight = new Explorer.Insight('testnet')

function BitcoinTransaction() {

    return {
        createTransaction: (senderPrivateKey, senderAddress, receiverAddress) => {
            return new Promise((resolve, reject) => {
                let txHash;
                let privateKeyWIF;
                const minorFee = 50000;
                const txAmount = 10000;
                insight.getUnspentUtxos(senderAddress, function (error, utxos) {

                    if (error) {
                        return reject(error);
                    } else {

                        if (utxos.length == 0) {
                            //if no transactions have happened, there is no balance on the address.
                            return reject("You don't have enough Satoshis to cover the miner fee.");
                        }

                        let balance = 0;
                        privateKeyWIF = bitcore.PrivateKey.fromWIF(senderPrivateKey.toString('hex'));
                        for (var i = 0; i < utxos.length; i++) {
                            balance += utxos[i]['satoshis'];
                        }
                        console.log('balance:' + balance);

                        if ((balance - txAmount - minorFee) > 0) {

                            try {
                                let tx = bitcore.Transaction()
                                tx.from(utxos)
                                tx.to(receiverAddress, txAmount)
                                tx.change(senderAddress)
                                tx.fee(minorFee)
                                tx.sign(privateKeyWIF);

                                insight.broadcast(tx.serialize(), (err, txId) => {
                                    if (err) {
                                        return reject(err);
                                    }
                                    else {
                                        //console.log(`successful broadcast : ${txId}`);
                                        txHash = txId;
                                        return resolve(txHash);
                                    }
                                });

                            } catch (err) {
                                return reject(err);
                            }
                            
                        } else {
                            return reject("You don't have enough Satoshis to cover the miner fee.");
                        }
                    }
                });
            })
        }
    }
}

module.exports = {
    BitcoinTransaction: BitcoinTransaction
}

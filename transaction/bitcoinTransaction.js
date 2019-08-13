const bitcore = require('bitcore-lib')
const Explorer = require('bitcore-explorers')
const insight = new Explorer.Insight('testnet')

function BitcoinTransaction() {

    return {
        createTransaction: (senderPrivateKey, senderAddress, receiverAddress) => {
            return new Promise((resolve, reject) => {
                let txHash;
                let privateKeyWIF;
                insight.getUnspentUtxos(senderAddress, function (error, utxos) {

                    if (error) {
                        reject(error);
                    }
                    else {
                        let balance = 0;
                        privateKeyWIF = bitcore.PrivateKey.fromWIF(senderPrivateKey.toString('hex'));
                        for (var i = 0; i < utxos.length; i++) {
                            balance += utxos[i]['satoshis'];
                        }
                        console.log('balance:' + balance);
                        let tx = bitcore.Transaction()
                        tx.from(utxos)
                        tx.to(receiverAddress, 10000)
                        tx.change(senderAddress)
                        tx.fee(50000)
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
                    }
                });
            })
        }
    }
}

module.exports = {
    BitcoinTransaction: BitcoinTransaction
}

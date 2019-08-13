const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction

function EthereumTransaction() {
    return {
        createTransaction: (senderPrivateKey, senderAddress, receiverAddress) => {

            let txHash;
            const rpcURL = "https://rinkeby.infura.io/3009c74d4930456990ed34ba352440e9";
            const web3 = new Web3(rpcURL);
            web3.eth.getTransactionCount(senderAddress, (err, txCount) => {
                let rawTx = {
                    nonce: web3.utils.toHex(txCount),
                    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                    gasLimit: web3.utils.toHex(21000),
                    to: receiverAddress,
                    value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether'))
                }

                const tx = new Tx(rawTx, { chain: 'rinkeby', hardfork: 'petersburg' })
                tx.sign(senderPrivateKey)

                const serializedTx = tx.serialize()
                const raw = '0x' + serializedTx.toString('hex')

                // Broadcast the transaction
                web3.eth.sendSignedTransaction(raw, (err, txId) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(`txHash : ${txId}`);
                        txHash = txId;
                    }
                });
            });
            return txHash;
        }
    }
}

module.exports = {
    EthereumTransaction : EthereumTransaction
}

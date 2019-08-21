const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const userInput = require('../userInput')
const dotenv = require('dotenv').config()

function EthereumTransaction() {
    return {
        createTransaction: (senderPrivateKey, senderAddress, receiverAddress) => {

            return new Promise(async (resolve, reject) => {

                const rpcURL = process.env.TESTNET_PROVIDER_ETHEREUM;
                const web3 = new Web3(rpcURL);
                const txAmountInEthers = userInput.getEthers();
                const txAmount = web3.utils.toWei(txAmountInEthers, 'ether');
                if (web3.utils.toChecksumAddress(senderAddress) && web3.utils.toChecksumAddress(receiverAddress)) {
                    let txHash;

                    try {
                        const balance = await web3.eth.getBalance(senderAddress);
                        const gasPrice = await web3.eth.getGasPrice();
                        const nonce = await web3.eth.getTransactionCount(senderAddress);
                        const gasEstimate = await web3.eth.estimateGas({
                            to: receiverAddress,
                            from: senderAddress,
                            nonce: web3.utils.toHex(nonce)
                        });
                    } catch (err) {
                        console.log(err);
                    }

                    if ((balance - txAmount) > 0) {
                        let rawTx = {
                            nonce: web3.utils.toHex(nonce),
                            gasPrice: web3.utils.toHex(gasPrice),
                            gasLimit: web3.utils.toHex(gasEstimate),
                            to: receiverAddress,
                            value: web3.utils.toHex(txAmount)
                        }

                        const tx = new Tx(rawTx, { chain: 'rinkeby', hardfork: 'petersburg' })
                        tx.sign(senderPrivateKey)

                        const serializedTx = tx.serialize()
                        const raw = '0x' + serializedTx.toString('hex')

                        // Broadcast the transaction
                        web3.eth.sendSignedTransaction(raw, (err, txId) => {
                            if (err) {
                                return reject(err);
                            }
                            else {
                                //console.log(`txHash : ${txId}`);
                                txHash = txId;
                                return resolve(txHash);
                            }
                        });
                    } else {
                        return reject("Not enough amount in wallet");
                    }
                } else {
                    return reject("Sender or reciever address is not valid");
                }

            })
        }
    }
}

module.exports = {
    EthereumTransaction: EthereumTransaction
}

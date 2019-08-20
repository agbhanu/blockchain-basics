const { TransactionAdapter } = require('./transactionAdapter')
const { BitcoinTransaction } = require('./bitcoinTransaction')
const { EthereumTransaction } = require('./etherTransaction')

const createTransaction = async (coinName, senderPrivateKey, senderAddress, receiverAddress) => {

    let txHash;
    try {
        if (coinName === 'Bitcoin') {
            txHash = await TransactionAdapter(BitcoinTransaction(), senderPrivateKey, senderAddress, receiverAddress);
        }
        else if (coinName === 'Ether') {
            txHash = await TransactionAdapter(EthereumTransaction(), senderPrivateKey, senderAddress, receiverAddress)
        }
        return txHash;
    } catch (err) {
        return new Error(err);
    }
}

module.exports = {
    createTransaction: createTransaction
}

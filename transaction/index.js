const { TransactionAdapter } = require('./transactionAdapter')
const { BitcoinTransaction } = require('./bitcoinTransaction')
const { EthereumTransaction } = require('./etherTransaction')

const createTransaction = async (coinName, senderPrivateKey, senderAddress, receiverAddress) => {

    let txHash;
    if (coinName == 'Bitcoin') {
        txHash = await TransactionAdapter(BitcoinTransaction(), senderPrivateKey, senderAddress, receiverAddress);
    }
    else if (coinName == 'Ether') {
        txHash = await TransactionAdapter(EthereumTransaction(), senderPrivateKey, senderAddress, receiverAddress)
    }
    return txHash;
}

module.exports = {
    createTransaction : createTransaction
}

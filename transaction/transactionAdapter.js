async function TransactionAdapter(txObject, senderPrivateKey, senderAddress, recieverAddress) {
    try {
        return await txObject.createTransaction(senderPrivateKey, senderAddress, recieverAddress);
    } catch (err) {
        return new Error(err);
    }
}

module.exports = {
    TransactionAdapter: TransactionAdapter
};

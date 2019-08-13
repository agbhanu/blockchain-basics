async function TransactionAdapter(txObject,senderPrivateKey,senderAddress,recieverAddress){
    return await txObject.createTransaction(senderPrivateKey,senderAddress,recieverAddress);
}

module.exports = {
    TransactionAdapter : TransactionAdapter
};

import {TransactionAdapter} from './transactionAdapter'

export const createTransaction = async (coinName, senderPrivateKey, senderAddress, receiverAddress) => {
    return await TransactionAdapter(coinName,senderPrivateKey,senderAddress,receiverAddress);
}

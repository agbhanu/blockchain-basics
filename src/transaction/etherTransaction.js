import Web3 from 'web3'
import { Transaction as Tx } from 'ethereumjs-tx'
import * as userInput from '../userInput'
import BN from 'bignumber.js'
import { ETHEREUM_NETWORK } from '../constants'
import dotenv from 'dotenv'
dotenv.config();

export const createEthereumTransaction = (senderPrivateKey, senderAddress, receiverAddress) => {

  return new Promise(async (resolve, reject) => {

    try {
      const web3 = getWeb3Instance(process.env.TESTNET_PROVIDER_ETHEREUM);
      const txAmountInEthers = userInput.getEthers();

      // check amount entered correctly or not
      if (isNaN(txAmountInEthers)) {
        throw new Error('Not valid amount');
      }

      const txAmount = fromEthersToWei(web3, txAmountInEthers);
      if (!(isValidAddress(web3, senderAddress) && isValidAddress(web3, receiverAddress))) {
        return reject("Sender or reciever address is not valid");
      }

      const balance = await getBalance(web3, senderAddress);
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await getNonce(web3, senderAddress);
      const gasLimit = await getEstimateGas(web3, senderAddress, receiverAddress, nonce);
      const minerFee = gasPrice*gasLimit;

      if ((balance - txAmount-minerFee) < 0) {
        throw new Error("Not enough amount in wallet");
      }

      const tx = getTx(web3, nonce, gasPrice, gasLimit, receiverAddress, txAmount);
      tx.sign(senderPrivateKey)
      const serializedTx = getSerialzedTx(tx);
      const txHash = await broadcastTx(web3, serializedTx);
      return resolve(txHash);
    } catch (err) {
      return reject(err);
    }
  });
}

export const getWeb3Instance = (rpcURL) => {
  return new Web3(rpcURL);
}

export const isValidAddress = (web3, address) => {
  return web3.utils.toChecksumAddress(address);
}

export const getNonce = async (web3, senderAddress) => {
  const nonce = await web3.eth.getTransactionCount(senderAddress);
  return (nonce + 1);
}

export const getEstimateGas = async (web3, senderAddress, receiverAddress, nonce) => {
  const estimatedGas = await web3.eth.estimateGas({
    to: receiverAddress,
    from: senderAddress,
    nonce: nonce
  });
  return estimatedGas;
}

export const getBalance = async (web3, senderAddress) => {
  return new BN(await web3.eth.getBalance(senderAddress)).toNumber();
}

export const fromEthersToWei = (web3, amount) => {
  return new BN(web3.utils.toWei(amount, 'ether')).toNumber();
}

export const getTx = (web3, nonce, gasPrice, gasLimit, to, value) => {
  const rawTx = {
    nonce: web3.utils.toHex(nonce),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: to,
    value: web3.utils.toHex(value)
  }
  return new Tx(rawTx, { chain: ETHEREUM_NETWORK});
}

export const getSerialzedTx = (tx) => {
  const serializedTx = tx.serialize();
  return '0x' + serializedTx.toString('hex');
}

export const broadcastTx = (web3, serializedTx) => {
  return new Promise((resolve, reject) => {
    web3.eth.sendSignedTransaction(serializedTx, (err, txHash) => {
      if (err) {
        throw new Error(err);
      }
      return resolve(txHash);
    });
  })
}

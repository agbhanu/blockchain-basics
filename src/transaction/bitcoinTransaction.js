import * as bitcoin from 'bitcoinjs-lib'
import bitcore from 'bitcore-lib'
import { DUST_VALUE, SATOSHIS, BITCOIN_NETWORK } from '../constants'
import Explorer from 'bitcore-explorers'
import * as userInput from '../userInput'
import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
import WAValidator from 'wallet-address-validator'
import BN from 'bignumber.js'

export const createBitcoinTransaction = (senderPrivateKey, senderAddress, receiverAddress) => {
  return new Promise(async (resolve, reject) => {

    try {

      const txAmount = fromBitcoinsToSatoshis(userInput.getBitcoins());
      if (isNaN(txAmount)) {
        throw new Error("Not valid amount");
      }

      if (txAmount < DUST_VALUE) {
        throw new Error("Amount want to send is too less ( please send more than 600 satoshis)");
      }

      if (!(isValidAddress(senderAddress, 'BTC', 'testnet') && isValidAddress(receiverAddress, 'BTC', 'testnet'))) {
        throw new Error("Sender or reciever address is not valid")
      }

      const insight = new Explorer.Insight(BITCOIN_NETWORK);
      const privateKeyWIF = bitcore.PrivateKey.fromWIF(senderPrivateKey.toString('hex'));
      const feePerByte = await getMiningFeePerByte();

      const utxos = await getUtxos(insight, senderAddress);
      const balance = getBalance(insight, utxos);
      const tx = getTx(utxos, receiverAddress, txAmount, senderAddress);

      const txSizeInBytes = tx._estimateSize();
      const minerFee = txSizeInBytes * feePerByte;

      if ((balance - txAmount - minerFee) < 0) {
        throw new Error("You don't have enough Satoshis to cover the miner fee.")
      }

      // add mining fee and sign tx with private key
      tx.fee(minerFee);
      tx.sign(privateKeyWIF);

      const txHash = await broadcastTx(insight, tx);
      return resolve(txHash);
    } catch (error) {
      return reject(error);
    }
  })
}

export const fromBitcoinsToSatoshis = (txAmount) => {
  return new BN(txAmount).multipliedBy(1e8).toNumber();
}

export const getUtxos = (insight, senderAddress) => {
  return new Promise((resolve, reject) => {
    insight.getUnspentUtxos(senderAddress, (err, utxos) => {

      if (err)
        throw new Error(err);

      return resolve(utxos);
    })
  })
}

export const getBalance = (insight, utxos) => {
  let balance = 0;
  for (var i = 0; i < utxos.length; i++) {
    balance += new BN(utxos[i][SATOSHIS]).toNumber();
  }
  return balance;
}

export const isValidAddress = (address, coinName, network) => {
  return (WAValidator.validate(address, coinName, network));
}

export const getTx = (utxos, receiverAddress, amount, changeAddress) => {
  const tx = bitcore.Transaction();
  tx.from(utxos)
  tx.to(receiverAddress, amount)
  tx.change(changeAddress)
  return tx;
}

export const getMiningFeePerByte = async () => {
  const feeObj = await axios.get(process.env.MINOR_FEE_CALCULATOR);
  //console.log(feeObj.data.halfHourFee);
  return feeObj.data.halfHourFee;
}

export const broadcastTx = (insight, tx) => {
  return new Promise((resolve, reject) => {
    insight.broadcast(tx.serialize(), (err, txHash) => {
      if (err) {
        throw new Error(err);
      }
      return resolve(txHash);
    });
  })
}

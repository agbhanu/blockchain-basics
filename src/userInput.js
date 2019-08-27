import readline from 'readline-sync'
import * as constants from './constants'

export const getOptionForMnemonic = () => {

  const option = Number(readline.question("Choose Option \n 1. Create new mnemonic \n 2. Use existing mnemonic\n"));
  return constants.MnemonicOption[option] || constants.MnemonicOption['default'];
}

export const getExistingMnemonic = () => {

  const userMnemonic = readline.question("Enter existing mnemonic \n");
  return userMnemonic;
}

export const getOptionForPassphrase = () => {
  const userOption = readline.question("Do you want to add passphrase(y/n) Defualt : yes \n ");
  if (userOption === 'y' || userOption === 'Y' || userOption === 'yes' || userOption === 'YES')
    return 'yes';
  return 'no';
}

export const getPassphrase = () => {
  const passphrase = readline.question("Enter passphrase : ");
  return passphrase;
}

export const getCoinName = () => {

  const option = readline.question("Choose (Default : Bitcoin) \n 1. Bitcoin \n 2. Ether \n");
  return constants.CoinName[option] || constants.CoinName['default']
}

export const getAlgoOption = () => {

  const algoOption = readline.question("Choose (Default : BIP32) \n 1. BIP32 \n 2. BIP44 \n");
  return constants.AlgoOption[algoOption] || constants.AlgoOption['default'];
}

export const getCoinType = () => {

  const coinType = readline.question("Choose (Default : BitCoin) \n 1. BitCoin \n 2. Ethereum \n");
  return constants.CoinType[coinType] || constants.CoinType['default'];
}

export const getAccountNo = () => {
  const accountNo = readline.question("Enter Account Number Index:");
  return accountNo;
}

export const getChainName = () => {
  const chainNameOption = readline.question("Choose (Default : External) \n 1. External(0) \n 2. Internal(1) \n");
  return constants.ChainNameOption[chainNameOption] || constants.ChainNameOption['default'];
}

export const getDerivePath = (algoOption) => {

  let derivePath;

  if (algoOption === constants.BIP32) {
    derivePath = readline.question("Enter derive path value \n sample format : (m/44/0/0/0/) \n");
  }
  else {
    const coinType = getCoinType();
    const accountNo = getAccountNo();
    const chainName = getChainName();
    derivePath = 'm/44/' + coinType + '/' + accountNo + '/' + chainName + '/';
  }
  return derivePath;
}

export const getEthers = () => {
  const ethers = readline.question("Enter amount want to send (in ethers):");
  return ethers;
}

export const getBitcoins = () => {
  const bitcoins = readline.question("Enter amount want to send (in bitcoins):");
  return bitcoins;
}

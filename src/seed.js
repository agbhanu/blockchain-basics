import Mnemonic from 'bitcore-mnemonic'

export const generateSeed = (mnemonicCode,passPhrase) => {
  const seed = new Mnemonic(mnemonicCode).toHDPrivateKey(passPhrase);
  return seed;
}

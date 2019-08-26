import * as bitcoin from 'bitcoinjs-lib'

const TestNet = bitcoin.networks.testnet;

export const getBitcoinAddressFromPublicKey = (publicKey) => {
    const { address } = bitcoin.payments.p2pkh({
        pubkey: publicKey,
        network: TestNet
    });
    return address;
}

const bitcoin = require('bitcoinjs-lib')
const TestNet = bitcoin.networks.testnet;

function BitcoinAddress() {

    return {

        getAddressFromPublicKey: (publicKey) => {

            let { address } = bitcoin.payments.p2pkh({
                pubkey: publicKey,
                network: TestNet
            });
            return address;
        }
    };
}

module.exports = {
    BitcoinAddress: BitcoinAddress
}

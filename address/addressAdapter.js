function AddressAdapter(addressObject,publicKey){
    return addressObject.getAddressFromPublicKey(publicKey);
}

module.exports = {
    AddressAdapter : AddressAdapter
}

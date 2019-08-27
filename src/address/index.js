import { AddressAdapter } from './addressAdapter'

export const addAddressInChildKeyPairArray = (coinName, childKeyPairArray) => {
  return AddressAdapter(coinName, childKeyPairArray);
}

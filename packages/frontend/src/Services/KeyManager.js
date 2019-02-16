import Crypto from 'oc-crypto';

let inst = null;

export default class KeyManager {

  static get instance() {
    if(!inst) {
      inst = new KeyManager();
    }
    return inst;
  }

  constructor() {
    //This magically creates a new key in local storage if it doesn't exist
    this.publicEncryptionKey = Crypto.publicKey();
    [
      'decrypt',
      'encrypt'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    })
  }

  decrypt(msg, senderPublicKey) {
    return Crypto.decrypt(msg, senderPublicKey);
  }

  encrypt(msg, recieverPubKey) {
    return Crypto.encrypt(msg, recieverPubKey);
  }

}

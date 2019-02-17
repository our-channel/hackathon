import KeyManager from './KeyManager';
import IPFS from './IpfsAPIService';
import W3S from './Web3Service';

/**
  * Keeps incoming/outgoing message handling in one place to keep codec
  * logic in one place
**/
let inst = null;
export default class MessageIO {

  static get instance() {
    if(!inst) {
      inst = new MessageIO();
    }
    return inst;
  }

  constructor() {
    [
      'encodeOutgoing',
      'decodeIncoming'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    });
  }

  async encodeOutgoing(msg, recipientContract) {
    //1) encrypt the msg with recipients public key
    //2) store the msg in IPFS
    //3) sign the IPFS hash
    //4) return the hash and the signature
    let km = KeyManager.instance;
    let recPubKey = recipientContract.getEncryptionKey();

    let enc = km.encrypt(JSON.stringify(msg), recPubKey);
    let hash = await IPFS.instance.uploadFile(Buffer.from(enc));
    let sig = await W3S.instance.sign(hash);
    return {
      hash,
      sig
    }
  }

  async decodeIncoming(ipfsHash, senderContract) {
    //retrieve the IPFS hash
    //decrypt the data from IPFS using my private key and sender's public key
    //return the decrypted message as an object (it's  stored as JSON string)
    let data = await IPFS.instance.downloadFile(ipfsHash);
    let sendKey = senderContract.getEncryptionKey();
    let dec = KeyManager.instance.decrypt(data, sendKey);
    return JSON.parse(dec);
  }

}

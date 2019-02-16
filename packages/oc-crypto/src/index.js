import NaCl from 'tweetnacl';
import NaClUtil from 'tweetnacl-util';

export default class Crypto {
  static getKeyPair() {
    var storedSk = localStorage.getItem('mySecretKey');

    if (storedSk) {
      return NaCl.box.keyPair.fromSecretKey(NaClUtil.decodeBase64(storedSk));
    }

    var myKeyPair = NaCl.box.keyPair();
    var mySecretKey = NaClUtil.encodeBase64(myKeyPair.secretKey);
    localStorage.setItem('mySecretKey', mySecretKey);

    return myKeyPair;
  }

  static publicKey() {
    return NaClUtil.encodeBase64(this.getKeyPair().publicKey);
  }

  static encrypt(message, theirPublicKey) {
    var encMessage = NaClUtil.decodeUTF8(message);
    var nonce = NaCl.randomBytes(NaCl.secretbox.nonceLength);
    var pubKey = NaClUtil.decodeBase64(theirPublicKey);
    var box = NaCl.box(encMessage, nonce, pubKey, this.getKeyPair().secretKey)
    var fullMessage = new Uint8Array(nonce.length + box.length);
    fullMessage.set(nonce);
    fullMessage.set(box, nonce.length);

    return NaClUtil.encodeBase64(fullMessage);
  };

  static decrypt(messageWithNonce, theirPublicKey) {
    var pubKey = NaClUtil.decodeBase64(theirPublicKey);
    var messageWithNonceAsUint8Array = NaClUtil.decodeBase64(messageWithNonce);
    var nonce = messageWithNonceAsUint8Array.slice(0, NaCl.secretbox.nonceLength);
    var message = messageWithNonceAsUint8Array.slice(
      NaCl.secretbox.nonceLength,
      messageWithNonce.length
    );

    var decrypted = NaCl.box.open(message, nonce, pubKey, this.getKeyPair().secretKey);

    if (!decrypted) {
      throw new Error("Could not decrypt message");
    }

    return NaClUtil.encodeUTF8(decrypted);
  };
}

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tweetnacl = require('tweetnacl');

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _tweetnaclUtil = require('tweetnacl-util');

var _tweetnaclUtil2 = _interopRequireDefault(_tweetnaclUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Crypto = function () {
  function Crypto() {
    _classCallCheck(this, Crypto);
  }

  _createClass(Crypto, null, [{
    key: 'getKeyPair',
    value: function getKeyPair() {
      var storedSk = localStorage.getItem('mySecretKey');

      if (storedSk) {
        return _tweetnacl2.default.box.keyPair.fromSecretKey(_tweetnaclUtil2.default.decodeBase64(storedSk));
      }

      var myKeyPair = _tweetnacl2.default.box.keyPair();
      var mySecretKey = _tweetnaclUtil2.default.encodeBase64(myKeyPair.secretKey);
      localStorage.setItem('mySecretKey', mySecretKey);

      return myKeyPair;
    }
  }, {
    key: 'publicKey',
    value: function publicKey() {
      return _tweetnaclUtil2.default.encodeBase64(this.getKeyPair().publicKey);
    }
  }, {
    key: 'encrypt',
    value: function encrypt(message, theirPublicKey) {
      var encMessage = _tweetnaclUtil2.default.decodeUTF8(message);
      var nonce = _tweetnacl2.default.randomBytes(_tweetnacl2.default.secretbox.nonceLength);
      var pubKey = _tweetnaclUtil2.default.decodeBase64(theirPublicKey);
      var box = _tweetnacl2.default.box(encMessage, nonce, pubKey, this.getKeyPair().secretKey);
      var fullMessage = new Uint8Array(nonce.length + box.length);
      fullMessage.set(nonce);
      fullMessage.set(box, nonce.length);

      return _tweetnaclUtil2.default.encodeBase64(fullMessage);
    }
  }, {
    key: 'decrypt',
    value: function decrypt(messageWithNonce, theirPublicKey) {
      var pubKey = _tweetnaclUtil2.default.decodeBase64(theirPublicKey);
      var messageWithNonceAsUint8Array = _tweetnaclUtil2.default.decodeBase64(messageWithNonce);
      var nonce = messageWithNonceAsUint8Array.slice(0, _tweetnacl2.default.secretbox.nonceLength);
      var message = messageWithNonceAsUint8Array.slice(_tweetnacl2.default.secretbox.nonceLength, messageWithNonce.length);

      var decrypted = _tweetnacl2.default.box.open(message, nonce, pubKey, this.getKeyPair().secretKey);

      if (!decrypted) {
        throw new Error("Could not decrypt message");
      }

      return _tweetnaclUtil2.default.encodeUTF8(decrypted);
    }
  }]);

  return Crypto;
}();

exports.default = Crypto;
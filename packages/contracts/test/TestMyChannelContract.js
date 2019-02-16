//To Unit test only this file
//truffle test ./test/TestCertificateWallet.js

var MyChannel = artifacts.require("./MyChannel.sol");

// const util = require('ethereumjs-util');

// const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

contract('MyChannel', (accounts) => {

    var certificateWalletInstance;
    var PACC = accounts[0];
    var userAcc1 = accounts[1];
    var userAcc2 = accounts[2];
    var userAcc3 = accounts[3];
    var userAcc4 = accounts[4];

    beforeEach('setup contract for each test', async() => {
        myChannelInstance  = await MyChannel.new();
    })

    // it("1. Owner should be userAcc1", async() =>  {
    //     await myChannelInstance.SetOwner(userAcc1);
    //     var x = await myChannelInstance.GetOwner();
    //     assert.equal(x.valueOf(), userAcc1, "userAcc1 wasn't the Owner");
    // });
    //
    // it("2.0 Check added public key for userAcc2 in whitelist", async() =>  {
    //     await myChannelInstance.AddContactToWhitelist(userAcc1, "0x00ba18CFFE0545323B7118cF37300f59c4565D6Baaa");
    //     await myChannelInstance.AddContactToWhitelist(userAcc2, "0x293e322249362fb1Ad37C08863a228D51e442B1Cbb");
    //
    //     var x = await myChannelInstance.GetContactPublicKey(userAcc2);
    //     assert.equal(x.valueOf(), "0x293e322249362fb1Ad37C08863a228D51e442B1Cbb".toLowerCase(), "userAcc2 public key is correct ");
    // });

    it("3. Owner should be userAcc1", async() =>  {

        await myChannelInstance.SetPublicKey("1234567890");
        var x = await myChannelInstance.GetPublicKey();
        assert.equal(x.valueOf(), "1234567890", "userAcc1 wasn't the Owner");
    });

    // it("4.0 Check AddMessage", async() =>  {
    //
    //     var EthUtil             = require('ethereumjs-util');
    //
    //     const messageToSign = "hello world";
    //     const privateKey = "43f2ee33c522046e80b67e96ceb84a05b60b9434b0ee2e3ae4b1311b9f5dcc46";
    //
    //     var msgHash = EthUtil.hashPersonalMessage(new Buffer(messageToSign));
    //     var signature = EthUtil.ecsign(msgHash, new Buffer(privateKey, 'hex'));
    //     var signatureRPC = EthUtil.toRpcSig(signature.v, signature.r, signature.s)
    //
    //     console.log(signatureRPC);
    //
    //     // await myChannelInstance.AddMessage(userAcc1, "0x293e322249362fb1Ad37C08863a228D51e442B1Cbb","0x100","0x200","0x300");
    // });

});

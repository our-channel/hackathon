//To Unit test only this file
//truffle test ./test/TestCertificateWalletFactory.js

var MyChannelFactory = artifacts.require("./MyChannelFactory.sol");
var MyChannel = artifacts.require("./MyChannel.sol");
var UserRegistry = artifacts.require("./UserRegistry.sol");

contract('MyChannelFactory', (accounts) => {
    var myChannelFactoryInstance;
    var myChannelInstance;
    var myUserRegistryInstance;

    var PACC = accounts[0];
    var userAcc1 = accounts[1];
    var userAcc2 = accounts[2];
    var userAcc3 = accounts[3];
    var userAcc4 = accounts[4];

    beforeEach('setup contracts for each test', async() => {
        myUserRegistryInstance  = await UserRegistry.new();
        myChannelFactoryInstance  = await MyChannelFactory.new(myUserRegistryInstance.address);
        myChannelInstance  = await MyChannel.new(userAcc4, "ABCDE");
    })

    it("1. Check Contract Count & Contract Info", async() =>  {
        await myChannelFactoryInstance.createChannel(userAcc1,"0123456789","pretty name1",{from:userAcc1});
        await myChannelFactoryInstance.createChannel(userAcc2,"1234567890","pretty name2",{from:userAcc2});
        await myChannelFactoryInstance.createChannel(userAcc3,"2345678901","pretty name3",{from:userAcc3});

        var x = await myChannelFactoryInstance.GetMyChannelContractCount();
        assert.equal(x.valueOf(), 3, "3 wasn't the Contract count");
        var y = await myChannelFactoryInstance.GetMyChannelContractAt(1);
        console.log(y,userAcc2);

        var r = await myUserRegistryInstance.GetAddressByName("pretty name2");
        assert.equal(r.valueOf(), y[1], "userAcc1 wasn't the Contract Address");

        // var z = await myUserRegistryInstance.GetNameByAddress(userAcc2);
        // assert.equal(z.valueOf(), "pretty name2", "pretty name2 wasn't the Contract Name");

    });

    // it("2. Send MessageVia Relay", async() =>  {
    //         await myChannelFactoryInstance.RelayMessage(myChannelInstance.address,userAcc1, "0x293e322249362fb1Ad37C08863a228D51e442B1Cbb","0x100","0x200","0x300");
    //         var x = await myChannelInstance.GetPublicKey();
    //         assert.equal(x.valueOf(), "ABCDE", "ABCDE3 wasn't public key");
    //     });

    it("3. Check WhiteListedContactList", async() =>  {
        await myChannelInstance.AddContactToWhitelist(userAcc1);
        await myChannelInstance.AddContactToWhitelist(userAcc2);
        await myChannelInstance.AddContactToWhitelist(userAcc3);
        var list = await myChannelInstance.GetWhitelistedContacts();
        console.log(list);

    });

});

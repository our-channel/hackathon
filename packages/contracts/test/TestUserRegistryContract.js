//To Unit test only this file
//truffle test ./test/TestCertificateWallet.js

var UserRegistry = artifacts.require("./UserRegistry.sol");

// const util = require('ethereumjs-util');

// const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

contract('UserRegistry', (accounts) => {

    var certificateWalletInstance;
    var PACC = accounts[0];
    var userAcc1 = accounts[1];
    var userAcc2 = accounts[2];
    var userAcc3 = accounts[3];
    var userAcc4 = accounts[4];

    beforeEach('setup contract for each test', async() => {
        userRegistryInstance  = await UserRegistry.new();
    })

    it("1.0 Checking user registry", async() =>  {
        await userRegistryInstance.RegisterUser(userAcc1, "Pretty User Name 1");
        await userRegistryInstance.RegisterUser(userAcc2, "Pretty User Name 2");
        await userRegistryInstance.RegisterUser(userAcc3, "Pretty User Name 3");

        var x = await userRegistryInstance.GetAddressByName("Pretty User Name 2");
        assert.equal(x.valueOf(), userAcc2, "address for <Pretty User Name 2> couldn't find ");

        var x = await userRegistryInstance.GetNameByAddress(userAcc3);
        assert.equal(x.valueOf(), "Pretty User Name 3", "Name for userAcc2 couldn't find ");

        var x = await userRegistryInstance.GetNameByAddress(userAcc4);
        console.log(x);
        assert.equal(x, '', "Name for userAcc4 couldn't find ");

    });

});

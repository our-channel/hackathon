import Web3 from 'web3';

let inst = null;

export default class Web3Service {
  static get instance() {
    if(!inst) {
      inst = new Web3Service();
    }
    return inst;
  }

  constructor() {
    [
      'init',
      'sign'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    })
  }

  async init() {
    if(this.web3) {
      return;
    }

    this.web3 = new Web3(window.web3.currentProvider);
    let acts = await this.web3.eth.getAccounts();
    this.account = acts[0];
  }

  async sign(payload) {
    if(!this.web3) {
      console.log("Initializing web3");
      await this.init();
      console.log("Done");
    }
    console.log("Signing payload", payload, typeof payload);

    let msg = [{
      type: 'string',      // Any valid solidity type
      name: 'Message Hash',     // Any string label you want
      value: payload  // The value to sign
   }];

    return new Promise((done,err)=>{
      window.web3.currentProvider.sendAsync({
        method: 'eth_signTypedData',
        params: [msg, this.account],
        from: this.account,
      }, (e, result) => {
        if(e) {
          console.log("ERROR in signType", e);
          err(e);
        } else {
          if(result.error) {
            err(result.error);
          } else {
            let sig = result.result;
            if(sig.startsWith('0x')) {
              sig = sig.substr(2);
            }
            var r = '0x' + sig.substr(0, 64);
        		var s = '0x' + sig.substr(64, 64);
        		var v = '0x' + sig.substr(128, 2);
            done({r, s, v});
          }

        }
      });
    });
  }
}

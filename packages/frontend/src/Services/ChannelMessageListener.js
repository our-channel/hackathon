import Message from 'Model/Message';
import uuid from 'uuid/v4';
import KeyManager from 'Services/KeyManager';
import IdContract from 'Services/IDContractService';
import MsgIO from 'Services/MessageIO';

import _ from 'lodash';

import {
  RELAY_ADDRESS
} from 'Constants/Addresses';

import axios from 'axios';

const DEF_POLL = 5000;

export default class ChannelMessageListener {
  constructor(props) {
    this.contractAddress = props.contractAddress;
    this.pollPeriod = props.pollPeriod || DEF_POLL;
    this.dispatch = props.dispatch;
    this.getState = props.getState;
    this.retrieved = {};

    this.handler = props.handler;

    [
      'stop',
      'start',
      '_doPoll'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    });
  }

  async start() {
    if(this.sched) {
      return;
    }
    await this._doPoll();
    this.sched = setInterval(this._doPoll, this.pollPeriod);
  }

  stop() {
    if(this.sched) {
      let s = this.sched;
      this.sched = null;
      clearInterval(s);
    }
  }

  async _doPoll() {

     let state = this.getState();
     let web3 = state.web3;
     if(!web3.web3) {
       return;
     }

     var r = await axios.post(
       "https://api.thegraph.com/subgraphs/name/realdave/testevents",
       {
         query: "query($targetAddress: String!) { relayedMessages(targetAddress: $targetAddress) { id targetAddress sender ipfsAddress } }",
         variables: { "targetAddress": RELAY_ADDRESS },
       }
     );

     var events = _.get(r, "data.data.relayedMessages", []);
     events.forEach(async evt=>{
       if(this.retrieved[evt.id]) {
         return;
       }
       this.retrieved[evt.id] = true;
       let sender = evt.sender;
       let idContract = new IdContract({
         web3: web3.web3,
         contractAddress: sender,
         from: web3.account
       });

       let ipfsAddress = evt.ipfsAddress;
       let msg = await MsgIO.instance.decodeIncoming(ipfsAddress, idContract);
       msg = {
         ...msg,
         sender: sender
       }
       await this.dispatch(this.handler(msg));

     });
  }
}

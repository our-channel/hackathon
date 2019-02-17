import Message from 'Model/Message';
import uuid from 'uuid/v4';
import KeyManager from 'Services/KeyManager';

const DEF_POLL = 5000;

export default class ChannelMessageListener {
  constructor(props) {
    this.contractAddress = props.contractAddress;
    this.pollPeriod = props.pollPeriod || DEF_POLL;
    this.dispatch = props.dispatch;
    this.handler = props.handler;

    [
      'stop',
      'start',
      '_doPoll'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    });
  }

  start() {
    if(this.sched) {
      return;
    }
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
    //TODO: actually pull messages from graphQL or whatever endpoint
    let msg = new Message({
      id: uuid(),
      sender: "Test Contact",
      timestamp: Date.now(),
      body: "Test Message",
      read: false,
      subject: "Test"
    });

    //TODO: the message will be an IPFS link so go grab it

    //TODO: then decrypt the message with our key and the
    /*
    let km = KeyManager.instance;
    let enc = km.encrypt(JSON.stringify(msg),km.publicEncryptionKey);
    let dec = km.decrypt(enc, km.publicEncryptionKey);
    */
    await this.dispatch(this.handler(msg));
  }
}

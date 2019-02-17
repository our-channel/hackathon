import CreateService from 'Services/CreatedChannelService';
import KeyManager from 'Services/KeyManager';
import {
  LOCAL_ACCOUNTS_KEY
} from 'Constants/LSKeys';
import {Creators} from './actions';
import _ from 'lodash';

const init = () => async (dispatch, getState) => {
  let cl = CreateService.instance;
  let w3 = getState().web3;
  if(!w3.account) {
    console.log("No account!");
    return;
  }

  let channelEvents = await cl.getCreatedChannels(w3.account);

  let accounts = [];
  let obj = localStorage.getItem(LOCAL_ACCOUNTS_KEY) || "{}";
  obj = JSON.parse(obj);

  channelEvents.forEach(c=>{
    obj[c.channelContractAddress] = {
      contractAddress: c.channelContractAddress,
      walletAddress: c.holderAddress,
      userName: c.userName,
      loggedIn: false
    };
  });
  localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(obj));
  let events = _.keys(obj).map(k=>obj[k]);
  dispatch(Creators.initSuccess(events));
}

const createId = () => async (dispatch,getState) => {
    let state = getState();
    let web3 = state.web3.web3;
    let idFactory = state.services.idFactory;
    let accts = await web3.eth.getAccounts();
    await idFactory.createChannel(accts[0], KeyManager.instance.publicEncryptionKey, "mike");
  }
export default {
  init,
  createId,
}

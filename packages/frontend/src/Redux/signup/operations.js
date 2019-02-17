import CreateService from 'Services/CreatedChannelService';
import KeyManager from 'Services/KeyManager';

const init = () => async (dispatch, getState) => {
  let cl = CreateService.instance;
  let w3 = getState().web3;
  if(!w3.account) {
    console.log("No account!");
    return;
  }

  let channelEvents = await cl.getCreatedChannels(w3.account);
  console.log("Channel events", channelEvents, w3.account);
}

const createId = () => async (dispatch,getState) => {
    let state = getState();
    let web3 = state.web3.web3;
    let idFactory = state.web3.idFactory;
    let accts = await web3.eth.getAccounts();
    await idFactory.createChannel(accts[0], KeyManager.instance.publicEncryptionKey, "mike");
  }
export default {
  init,
  createId,
}

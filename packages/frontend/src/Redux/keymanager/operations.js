import {Creators} from './actions';
import ChannelListener from 'Services/ChannelMessageListener';
import {default as inboxOps} from 'Redux/inbox/operations';

const TEST_CONTRACT = "0xA62B4c691F08D192d4be2025c7c40725213a0Af5";

let channelListener = null;

const init = () => async (dispatch,getState) => {
  let state = getState();
  let relayService = state.web3.idFactory;
  console.log("RELAY", relayService);

  //TODO: read actual key from local storage

  channelListener = new ChannelListener({
    contractAddress: TEST_CONTRACT,
    relayService,
    dispatch,
    getState,
    handler: msg => () => {
      dispatch(inboxOps.incomingMessages([msg]))
    }
  });
  channelListener.start();
  dispatch(Creators.initRequest());
  dispatch(Creators.initSuccess(TEST_CONTRACT));
}

export default {
  init
}

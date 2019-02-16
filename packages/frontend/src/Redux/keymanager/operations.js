import {Creators} from './actions';
import ChannelListener from 'Services/ChannelMessageListener';

const TEST_CONTRACT = "0x539d7c973c53d0f0481f3efc4e0038a4201a7b2c";

let channelListener = null;

const init = () => async dispatch => {
  //TODO: read actual key from local storage
  channelListener = new ChannelListener({
    contractAddress: TEST_CONTRACT,
    dispatch,
    handler: msg => {
      console.log("INCOMING", msg);
      return {
        type: "TEST_READER"
      }
    }
  });
  channelListener.start();
  dispatch(Creators.initRequest());
  dispatch(Creators.initSuccess(TEST_CONTRACT));
}

export default {
  init
}

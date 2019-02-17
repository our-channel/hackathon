import {Creators} from './actions';
import ChannelListener from 'Services/ChannelMessageListener';
import {default as inboxOps} from 'Redux/inbox/operations';

const TEST_CONTRACT = "0x41248911ee8058f9c812ee342c9f43de31455909";

let channelListener = null;

const init = () => async dispatch => {
  //TODO: read actual key from local storage
  channelListener = new ChannelListener({
    contractAddress: TEST_CONTRACT,
    dispatch,
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

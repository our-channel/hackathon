import {default as inboxOps} from 'Redux/inbox/operations';
import {default as keyOps} from 'Redux/keymanager/operations';
import {default as web3Ops} from 'Redux/web3/operations';
import {Creators} from './actions';

const init = () => async (dispatch,getState)=> {
  let state = getState();
  if(state.init.initialized) {
    return;
  }

  let calls = [];
  if(inboxOps.init) {
    calls.push(dispatch(inboxOps.init()));
  }
  if(web3Ops.init) {
    calls.push(dispatch(web3Ops.init()));
  }
  if(keyOps.init) {
    calls.push(dispatch(keyOps.init()));
  }
  await Promise.all(calls);
  dispatch(Creators.initComplete());
}

export default {
  init
}

import {default as inboxOps} from 'Redux/inbox/operations';
import {default as keyOps} from 'Redux/keymanager/operations';
import {default as web3Ops} from 'Redux/web3/operations';
import {default as signOps} from 'Redux/signup/operations';
import {Creators} from './actions';

const init = () => async (dispatch,getState)=> {
  let state = getState();
  if(state.init.initialized) {
    return;
  }

  let calls = [];
  //web3 first!
  await dispatch(web3Ops.init())
  .then(async ()=>{
    if(inboxOps.init) {
      calls.push(dispatch(inboxOps.init()));
    }
    if(keyOps.init) {
      calls.push(dispatch(keyOps.init()));
    }
    if(signOps.init) {
      console.log("Running signup init");
      calls.push(dispatch(signOps.init()));
    }
    try {
      await Promise.all(calls);
    } catch (e) {
      console.log("Problem in main init", e);
    }

    dispatch(Creators.initComplete());
  })
  .catch(e=>{
    console.log("Problem in main init", e);
  });
}

export default {
  init
}

import {default as inboxOps} from 'Redux/inbox/operations';
import {default as keyOps} from 'Redux/keymanager/operations';
import {default as web3Ops} from 'Redux/web3/operations';
import {default as signOps} from 'Redux/signup/operations';
import {default as serviceOps} from 'Redux/services/operations';
import {default as contactOps} from 'Redux/contacts/operations';

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
    console.log("Web3 done, signup ops next");
    dispatch(signOps.init())
    .then(async ()=>{
      console.log("Signup done, service ops next");
      dispatch(serviceOps.init())
      .then(async () => {
        console.log("Service ops done")
        if(inboxOps.init) {
          calls.push(dispatch(inboxOps.init()));
        }
        calls.push(dispatch(contactOps.init()));

        if(keyOps.init) {
          calls.push(dispatch(keyOps.init()));
        }
        calls.push(dispatch(signOps.init()));

        try {
          await Promise.all(calls);
        } catch (e) {
          console.log("Problem in main init", e);
        }

        dispatch(Creators.initComplete());
      })
      .catch(e=>{
        console.log("Problem init service", e);
      });


    })
    .catch(e=>{
      console.log("Problem in services ops init", e);
    })
  })
  .catch(e=>{
    console.log("Problem in main init", e);
  });
}

export default {
  init
}

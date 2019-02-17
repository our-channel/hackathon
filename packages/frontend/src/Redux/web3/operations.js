import {Creators} from './actions';
import Web3 from 'web3';


const init = () => async (dispatch,getState) => {
  let state = getState();
  let account = null;

  dispatch(Creators.initRequest());
  let web3= null;
  if(window.web3) {
     web3 = new Web3(window.web3.currentProvider);
     let acts = await web3.eth.getAccounts();
     account = acts[0].toLowerCase();
  }

  dispatch(Creators.initSuccess(web3, account));
}

export default {
  init
}

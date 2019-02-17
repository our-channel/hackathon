import {Creators} from './actions';
import Web3 from 'web3';
import IDContractService from 'Services/IDContractService'
import IDFactoryService from 'Services/IDFactoryService';
import UserRegistryService from 'Services/UserRegistryService';

const init = () => async (dispatch,getState) => {
  let state = getState();
  let contractAddress = state.keymanager.didAddress;

  let idFactory = null;
  let idContract = null;
  let userRegistry = null;
  let account = null;

  dispatch(Creators.initRequest());
  let web3= null;
  if(window.web3) {
     web3 = new Web3(window.web3.currentProvider);
     let acts = await web3.eth.getAccounts();
     account = acts[0];
     idFactory = new IDFactoryService({web3});
     idContract = new IDContractService({
       web3,
       account,
       contractAddress
     });
     userRegistry = new UserRegistryService({
       web3,
       account,
       contractAddress: "0xbea9c7ab291a4252c9f259ddeb57657469cc6e84"
     });

  }

  dispatch(Creators.initSuccess(web3, account, idFactory, idContract, userRegistry));
}

export default {
  init
}

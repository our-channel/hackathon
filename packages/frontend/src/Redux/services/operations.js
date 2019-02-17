import IDContractService from 'Services/IDContractService'
import IDFactoryService from 'Services/IDFactoryService';
import UserRegistryService from 'Services/UserRegistryService';
import {Creators} from './actions';

const init = () => async (dispatch,getState) => {
  let state = getState();
  let w3 = state.web3;
  let web3 = w3.web3;
  let account = w3.account;
  if(!account) {
    throw new Error("Must have an account by now");
  }
  if(account) {
    account = account.toLowerCase();
  }
  let idFactory = new IDFactoryService({web3});
  let userRegistry = new UserRegistryService({
    web3,
    account,
    contractAddress: "0xbea9c7ab291a4252c9f259ddeb57657469cc6e84"
  });

  if(state.signup.localAccounts.length === 0) {
    dispatch(Creators.initSuccess(null, idFactory, userregistry))
    return;
  }

  let contractAddress = state.signup.localAccounts[0].contractAddress;

  let idContract = new IDContractService({
    web3,
    account,
    contractAddress
  });

  dispatch(Creators.initSuccess(idContract, idFactory, userRegistry));
}

const initIdContract = addr => (dispatch,getState) => {
  let state = getState();
  let w3 = state.web3;
  let web3 = w3.web3;
  let account = w3.account.toLowerCase();
  let idFactory = state.services.idFactory;
  let userRegistry = state.services.userRegistry;
  let idContract = new IDContractService({
    web3,
    account,
    contractAddress: addr
  });

  dispatch(Creators.initSuccess(idContract, idFactory, userRegistry));
}

export default {
  init,
  initIdContract
}

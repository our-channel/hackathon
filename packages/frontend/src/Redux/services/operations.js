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

  let contractAddress = state.signup.localAccounts[0].contractAddress;
  let idFactory = new IDFactoryService({web3});
  let idContract = new IDContractService({
    web3,
    account,
    contractAddress
  });
  let userRegistry = new UserRegistryService({
    web3,
    account,
    contractAddress: "0xbea9c7ab291a4252c9f259ddeb57657469cc6e84"
  });
  dispatch(Creators.initSuccess(idContract, idFactory, userRegistry));
}

export default {
  init
}

import {Creators} from './actions';

const createId = () => async (dispatch,getState) => {
  let state = getState();
  let web3 = state.web3.web3;
  let idFactory = state.web3.idFactory;
  let accts = await web3.eth.getAccounts();
  await idFactory.createChannel(accts[0]);
}

const sendMessage = (ipfsUrl) => async (dispatch,getState) => {
  let state = getState();
  console.log("STATE", state);
  
  let web3 = state.web3.web3;
  let idContract = state.web3.idContract;
  let contractAddress = state.keymanager.didAddress;
  console.log("My Id contract", contractAddress);
  await idContract.sendMessage(contractAddress, "0x8976564");
}

export default {
  createId,
  sendMessage
}

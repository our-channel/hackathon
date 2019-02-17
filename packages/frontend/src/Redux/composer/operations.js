import {Creators} from './actions';
import IDContract from 'Services/IDContractService';
import MsgIO from 'Services/MessageIO';

const createId = () => async (dispatch,getState) => {
  let state = getState();
  let web3 = state.web3.web3;
  let idFactory = state.web3.idFactory;
  let accts = await web3.eth.getAccounts();
  await idFactory.createChannel(accts[0]);
}

const sendMessage = (to, msg) => async (dispatch,getState) => {
  let state = getState();
  let web3 = state.web3.web3;
  let idContract = new IDContract({
    web3,
    account: state.web3.account,
    contractAddress: to
  });
  let contractAddress = state.keymanager.didAddress;
  let {
    hash,
    sig
  } = await MsgIO.instance.encodeOutgoing(msg, idContract);

  dispatch(Creators.sendStarted());
  try {
    let txnHash = await idContract.sendMessage(contractAddress, hash, sig);
    dispatch(Creators.sendCompleted(txnHash));
  } catch (e) {
    dispatch(Creators.sendFailure(e))
  }
}

const toggleModal = () => dispatch => {
  dispatch(Creators.toggleModal())
}

export default {
  createId,
  sendMessage,
  toggleModal
}

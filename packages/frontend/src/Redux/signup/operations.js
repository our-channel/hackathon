
const createId = () => async (dispatch,getState) => {
    let state = getState();
    let web3 = state.web3.web3;
    let idFactory = state.web3.idFactory;
    let accts = await web3.eth.getAccounts();
    await idFactory.createChannel(accts[0]);
  }
export default {
    createId,
}

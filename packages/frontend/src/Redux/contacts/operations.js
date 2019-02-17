import {Creators} from './actions';

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const toggleAdd = () => dispatch => {
  dispatch(Creators.toggleModal())
}

const search = (userOrAddr) => async (dispatch,getState) => {
  let state = getState();
  let w3 = state.web3.web3;


  let registry = state.web3.userRegistry;
  if(registry) {
    dispatch(Creators.searchStart());
    let r = await registry.search(userOrAddr);
    let ua = r.userAddress;
    console.log("UA", ua);
    
    if(ua && ua === ZERO_ADDRESS) {
      ua = [];
    } else {
      let a = [ua];
      ua = a;
    }

    dispatch(Creators.searchCompleted(ua));
  }
}

export default {
  toggleAdd,
  search
}

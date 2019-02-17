import {Creators} from './actions';
import Contact from 'Model/Contact';

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const init = () => async (dispatch,getState) => {
  let state = getState();
  let idCon = state.services.idContract;
  let reg = state.services.userRegistry;
  if(idCon) {
    let wl = await idCon.retrieveWhitelist();
    let calls = [];
    wl.forEach(addr=>{
      calls.push(reg.search(addr))
    })
    let matches = await Promise.all(calls);
    let contacts = wl.map((c,i)=>{
      return new Contact({
        name: matches[i].userName,
        idContractAddress: c
      });
    });
    dispatch(Creators.initSuccess(contacts));
  }
}

const toggleAdd = () => dispatch => {
  dispatch(Creators.toggleModal())
}

const search = (userOrAddr) => async (dispatch,getState) => {
  let state = getState();

  let registry = state.services.userRegistry;
  if(registry) {
    dispatch(Creators.searchStart());
    let r = await registry.search(userOrAddr);
    let ua = r.userAddress;
    if(ua && ua === ZERO_ADDRESS) {
      ua = [];
    } else {
      let a = [ua];
      ua = a;
    }

    dispatch(Creators.searchCompleted(ua));
  }
}

const addToWatchlist = (name, idContractAddr) => async (dispatch,getState) => {
  dispatch(Creators.addToWatchlistStart())
  let state = getState();
  let idContract = state.services.idContract;
  try {
    await idContract.addToWhitelist(idContractAddr);
    let whitelisted = await idContract.retrieveWhitelist();
    console.log("WHITELISTED", whitelisted);
    dispatch(Creators.addToWatchlistCompleted());
  } catch (e) {
    console.log("Problem in WL", e);
    dispatch(Creators.addToWatchlistFailure(e))
  }
}

export default {
  init,
  toggleAdd,
  search,
  addToWatchlist
}

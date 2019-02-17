import {Creators} from './actions';

const toggleAdd = () => dispatch => {
  dispatch(Creators.toggleModal())
}

const search = (userOrAddr) => async (dispatch,getState) => {
  let state = getState();
  dispatch(Creators.searchStart());
  
}

export default {
  toggleAdd,
  search
}

import {Creators} from './actions';

const init = () => async dispatch => {
  console.log("WTF");
  dispatch(Creators.loadRequest());
  dispatch(Creators.loadSuccess([]));
}

export default {
  init
}

import {Creators} from './actions';


const TEST_CONTRACT = "0x539d7c973c53d0f0481f3efc4e0038a4201a7b2c";

const init = () => async dispatch => {
  dispatch(Creators.initRequest());
  dispatch(Creators.initSuccess(TEST_CONTRACT));
}

export default {
  init
}

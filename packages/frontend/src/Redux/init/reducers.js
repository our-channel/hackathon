import {createReducer} from 'reduxsauce';
import {Types} from './actions';

const INIT = {
  initalized: false
}

const initDone = (state=INIT) => {
  return {
    ...state,
    initialized: true
  }
}

const HANDLERS = {
  [Types.INIT_COMPLETE]: initDone
}

export default createReducer(INIT, HANDLERS);

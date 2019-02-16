import {Types} from './actions';
import {createReducer} from 'reduxsauce';

const INIT = {
  loading: false,
  error: null,
  didAddress: null
}

const initRequest = (state=INIT) => {
  return {
    ...state,
    loading: true,
    error: null
  }
}

const initSuccess = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    didAddress: action.didAddress
  }
}

const initFail = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  }
}

const HANDLERS = {
  [Types.INIT_REQUEST]: initRequest,
  [Types.INIT_SUCCESS]: initSuccess,
  [Types.INIT_FAILURE]: initFail
}

export default createReducer(INIT, HANDLERS);

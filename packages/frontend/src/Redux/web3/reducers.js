import {Types} from './actions';
import {createReducer} from 'reduxsauce';

const INIT = {
  loading: false,
  error: null,
  web3: null,
  account: null,
  idFactory: null,
  idContract: null
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
    web3: action.web3,
    idFactory: action.idFactory,
    idContract: action.idContract,
    account: action.account
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

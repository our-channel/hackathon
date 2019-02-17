import {Types} from './actions';
import {createReducer} from 'reduxsauce';

const INIT = {
  loading: false,
  error: null,
  localAccounts: []
}

const createIdRequest = (state=INIT) => {
  return {
    ...state,
    loading: true,
    error: null
  }
}

const createIdSuccess = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    didAddress: action.didAddress
  }
}

const createIdFail = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    erorr: action.error
  }
}

const initComplete = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    localAccounts: action.accounts
  }
}

const HANDLERS = {
  [Types.CREATE_ID_REQUEST]: createIdRequest,
  [Types.CREATE_ID_SUCCESS]: createIdSuccess,
  [Types.CREATE_ID_FAILURE]: createIdFail,
  [Types.INIT_SUCCESS]: initComplete
}

export default createReducer(INIT, HANDLERS);

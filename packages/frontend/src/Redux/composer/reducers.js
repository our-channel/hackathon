import {createReducer} from 'reduxsauce';
import {Types} from './actions';

const INIT = {
  didAddress: null,
  loading: false,
  error: null
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

const HANDLERS = {
  [Types.CREATE_ID_REQUEST]: createIdRequest,
  [Types.CREATE_ID_SUCCESS]: createIdSuccess,
  [Types.CREATE_ID_FAILURE]: createIdFail
}

export default createReducer(INIT, HANDLERS);

import {createReducer} from 'reduxsauce';
import {Types} from './actions';

const INIT = {
  messages: [],
  loading: false,
  error: null
}

const loadRequest = (state=INIT) => {
  return {
    ...state,
    loading: true,
    error: null
  }
}

const loadSuccess = (state=INIT, action) => {
  console.log('loadSuccess');
  console.log(action)
  return {
    ...state,
    loading: false,
    messages: action.messages
  }
}

const loadFail = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    erorr: action.error
  }
}

const incoming = (state=INIT, action) => {
  let msgs = [
    ...state.messages,
    ...action.messages
  ];
  return {
    ...state,
    messages: msgs
  }
}

const HANDLERS = {
  [Types.LOAD_REQUEST]: loadRequest,
  [Types.LOAD_SUCCESS]: loadSuccess,
  [Types.LOAD_FAILURE]: loadFail,

  [Types.INCOMING_MESSAGES]: incoming
}

export default createReducer(INIT, HANDLERS);

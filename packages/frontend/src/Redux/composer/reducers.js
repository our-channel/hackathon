import {createReducer} from 'reduxsauce';
import {Types} from './actions';

const INIT = {
  didAddress: null,
  loading: false,
  error: null,
  modalShowing: false,
  sendTxnHashes: []
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

const toggleModal = (state=INIT) => {
  return {
    ...state,
    error: null,
    loading: false,
    modalShowing: !state.modalShowing
  }
}

const send = (state=INIT) => {
  return {
    ...state,
    loading: true
  }
}

const sendOk = (state=INIT, action) => {
  let hashes = [
    ...state.sendTxnHashes,
    action.hash
  ];
  return {
    ...state,
    loading: false,
    sendTxnHashes: hashes,
    modalShowing: false
  }
}

const sendFail = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  }
}

const HANDLERS = {
  [Types.CREATE_ID_REQUEST]: createIdRequest,
  [Types.CREATE_ID_SUCCESS]: createIdSuccess,
  [Types.CREATE_ID_FAILURE]: createIdFail,

  [Types.TOGGLE_MODAL]: toggleModal,
  [Types.SEND_STARTED]: send,
  [Types.SEND_COMPLETED]: sendOk,
  [Types.SEND_FAILURE]: sendFail
}

export default createReducer(INIT, HANDLERS);

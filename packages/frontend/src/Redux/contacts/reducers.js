import {createReducer} from 'reduxsauce';
import {Types} from './actions';

const INIT = {
  loading: false,
  error: null,
  showingAdd: false,
  searchResults: [],
  remoteContacts: []
}

const toggleAdd = (state=INIT) => {
  return {
    ...state,
    error: null,
    loading: false,
    showingAdd: !state.showingAdd
  }
}

const searchStart = (state=INIT) => {
  return {
    ...state,
    loading: true,
    error: null
  }
}

const searchOk = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    searchResults: action.hits
  }
}

const searchFail = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  }
}

const addWLStart = (state=INIT) => {
  return {
    ...state,
    loading: true,
    error: null
  }
}

const addWLOk = (state=INIT, action) => {
  return {
    ...state,
    loading: true,
    remoteContacts: action.contacts
  }
}

const initOk = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    remoteContacts: action.contacts
  }
}

const HANDLERS = {
  [Types.TOGGLE_MODAL]: toggleAdd,
  [Types.SEARCH_START]: searchStart,
  [Types.SEARCH_COMPLETED]: searchOk,
  [Types.SEARCH_FAILURE]: searchFail,
  [Types.INIT_SUCCESS]: initOk
}

export default createReducer(INIT, HANDLERS);

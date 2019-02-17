import {createReducer} from 'reduxsauce';
import {Types} from './actions';

const INIT = {
  loading: false,
  error: null,
  showingAdd: false,
  searchResults: []
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

const HANDLERS = {
  [Types.TOGGLE_MODAL]: toggleAdd,
  [Types.SEARCH_START]: searchStart,
  [Types.SEARCH_COMPLETED]: searchOk,
  [Types.SEARCH_FAILURE]: searchFail
}

export default createReducer(INIT, HANDLERS);

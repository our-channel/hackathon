import {Types} from './actions';
import {createReducer} from 'reduxsauce';

const INIT = {
  loading: false,
  error: null,
  idContract: null,
  idFactory: null,
  userRegistry: null
}


const initComplete = (state=INIT, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    idContract: action.idContract,
    idFactory: action.idFactory,
    userRegistry: action.userRegistry
  }
}

const HANDLERS = {
  [Types.INIT_SUCCESS]: initComplete
}

export default createReducer(INIT, HANDLERS);

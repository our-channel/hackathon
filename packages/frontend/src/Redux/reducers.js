import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr'
import {default as inboxReducer} from './inbox/reducers';
import {default as keymanagerReducer} from './keymanager/reducers';
import {default as web3Reducers} from './web3/reducers';
import {default as initReducers} from './init/reducers';

const root = combineReducers({
  toastr: toastrReducer,
  inbox: inboxReducer,
  keymanager: keymanagerReducer,
  web3: web3Reducers,
  init: initReducers
});

export default root;

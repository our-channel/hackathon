import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr'
import {default as inboxReducer} from './inbox/reducers';
import {default as keymanagerReducer} from './keymanager/reducers';
import {default as web3Reducers} from './web3/reducers';
import {default as initReducers} from './init/reducers';
import {default as signupReducers} from './signup/reducers';
import {default as composerReducers} from './composer/reducers';
import {default as contactsReducers} from './contacts/reducers';
import {default as serviceReducers} from './services/reducers';

const root = combineReducers({
  toastr: toastrReducer,
  inbox: inboxReducer,
  keymanager: keymanagerReducer,
  web3: web3Reducers,
  init: initReducers,
  signup: signupReducers,
  composer: composerReducers,
  contacts: contactsReducers,
  services: serviceReducers
});

export default root;

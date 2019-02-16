import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  initRequest: null,
  initSuccess: ['didAddress'],
  initFailure: ['error']
}, {prefix: "keymanager."});

export {
  Types,
  Creators
}

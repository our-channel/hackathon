import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  initRequest: null,
  initComplete: null
}, {prefix: "init."});

export {
  Types,
  Creators
}

import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  loadRequest: null,
  loadSuccess: ['messages'],
  loadFailure: ['error']
}, {prefix: "inbox."});

export {
  Types,
  Creators
}

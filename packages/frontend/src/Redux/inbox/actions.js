import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  loadRequest: null,
  loadSuccess: ['messages'],
  loadFailure: ['error'],

  incomingMessages: ['messages']
}, {prefix: "inbox."});

export {
  Types,
  Creators
}

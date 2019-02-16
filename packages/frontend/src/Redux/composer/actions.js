import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  //these were for testing
  createIdRequest: null,
  createIdSuccess: ['didAddress'],
  createIdFailure: ['error'],

  toggleModal: null,

  sendStarted: null,
  sendCompleted: ['hash'],
  sendFailure: ['error']

}, {prefix: "composer."});

export {
  Types,
  Creators
}

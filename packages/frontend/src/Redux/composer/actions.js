import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({

  toggleModal: null,

  sendStarted: null,
  sendCompleted: ['hash'],
  sendFailure: ['error']

}, {prefix: "composer."});

export {
  Types,
  Creators
}

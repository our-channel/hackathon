import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  //these were for testing
  createIdRequest: null,
  createIdSuccess: ['didAddress'],
  createIdFailure: ['error'],

  initSuccess: ['accounts']
}, {prefix: "signup."});

export {
  Types,
  Creators
}

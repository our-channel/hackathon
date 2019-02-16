import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  createIdRequest: null,
  createIdSuccess: ['didAddress'],
  createIdFailure: ['error']
}, {prefix: "composer."});

export {
  Types,
  Creators
}

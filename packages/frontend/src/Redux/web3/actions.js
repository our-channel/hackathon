import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  initRequest: null,
  initSuccess: ['web3', 'account', 'idFactory', 'idContract','userRegistry'],
  initFailure: ['error']
}, {prefix: "web3."});

export {
  Types,
  Creators
}

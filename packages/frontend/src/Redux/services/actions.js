import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  //these were for testing
  initSuccess: ['idContract', 'idFactory', 'userRegistry']
}, {prefix: "services."});

export {
  Types,
  Creators
}

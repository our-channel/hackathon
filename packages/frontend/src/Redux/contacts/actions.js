import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  toggleModal: null,
  searchStart: null,
  searchCompleted: ['hits'],
  searchFailure: ['error']
}, {prefix: "contacts."})

export {
  Types,
  Creators
}

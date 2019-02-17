import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  toggleModal: null,
  searchStart: null,
  searchCompleted: ['hits'],
  searchFailure: ['error'],

  addToWatchlistStart: null,
  addToWatchlistCompleted: ['contacts'],
  addToWatchlistFailure: ['error'],

  initSuccess: ['contacts']
}, {prefix: "contacts."})

export {
  Types,
  Creators
}

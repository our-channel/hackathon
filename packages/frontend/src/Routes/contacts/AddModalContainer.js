import {connect} from 'react-redux';
import AddModal from './AddModal';
import {default as cOps} from 'Redux/contacts/operations';

const s2p = state => {
  return {
    loading: state.contacts.loading,
    error: state.contacts.error,
    showing: state.contacts.showingAdd,
    searchResults: state.contacts.searchResults
  }
}

const d2p = dispatch => {
  return {
    cancel: () => dispatch(cOps.toggleAdd()),
    showAdd: () => dispatch(cOps.toggleAdd()),
    search: (search) => dispatch(cOps.search(search)),
    addToWL: (name,addr) => dispatch(cOps.addToWatchlist(name,addr))
  }
}

export default connect(s2p, d2p)(AddModal);

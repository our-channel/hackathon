import {connect} from 'react-redux';
import AddModal from './AddModal';
import {default as cOps} from 'Redux/contacts/operations';

const s2p = state => {
  return {
    loading: state.contacts.loading,
    error: state.contacts.error,
    showing: state.contacts.showingAdd
  }
}

const d2p = dispatch => {
  return {
    cancel: () => dispatch(cOps.toggleAdd()),
    showAdd: () => dispatch(cOps.toggleAdd()),
    search: (search) => dispatch(cOps.search(search))
  }
}

export default connect(s2p, d2p)(AddModal);

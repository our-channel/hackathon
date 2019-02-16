import {connect} from 'react-redux';
import Composer from './Composer';
import {default as ops} from 'Redux/composer/operations';

const s2p = state => {
  return {
    showing: state.composer.modalShowing,
    loading: state.composer.loading,
    error: state.composer.error
  }
}

const d2p = (dispatch) => {

  return {
    createID: () => {
      return dispatch(ops.createId())
    },
    sendMessage: (to, msg) => {
      return dispatch(ops.sendMessage(to, msg));
    },
    showComposer: () => {
      dispatch(ops.toggleModal())
    },
    cancel: () => {
      dispatch(ops.toggleModal())
    }
  }
}

export default connect(s2p, d2p)(Composer);

import {connect} from 'react-redux';
import Signup from './Signup';
import {default as ops} from 'Redux/signup/operations';

const s2p = state => {
  console.log(state)
  return {
      loading: state.signup.loading,
      error: state.signup.error,
  }
}

const d2p = dispatch => {
  return {
    createID: () => {
      return dispatch(ops.createId())
    },    
  }
}

export default connect(s2p, d2p)(Signup);

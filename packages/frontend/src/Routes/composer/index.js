import {connect} from 'react-redux';
import Composer from './Composer';
import {default as ops} from 'Redux/composer/operations';

const s2p = state => {
  return {
    web3: state.web3.web3,
    idContract: state.web3.idContract,
    idFactory: state.web3.idFactory
  }
}

const d2p = (dispatch) => {

  return {
    createID: () => {
      return dispatch(ops.createId())
    },
    sendMessage: () => {
      return dispatch(ops.sendMessage("ipfsURLEventually"))
    }
  }
}

export default connect(s2p, d2p)(Composer);

import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import {withRouter} from "react-router-dom";
import {default as compOps} from 'Redux/composer/operations';

const s2p = state => {

  return {

  }
}

const d2p = dispatch => {
  return {
    showComposer: () => dispatch(compOps.toggleModal())
  }
}

export default withRouter(connect(s2p, d2p)(Sidebar));

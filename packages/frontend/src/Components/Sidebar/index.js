import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import {withRouter} from "react-router-dom";

const s2p = state => {

  return {
    
  }
}

const d2p = dispatch => {
  return {

  }
}

export default withRouter(connect(s2p, d2p)(Sidebar));

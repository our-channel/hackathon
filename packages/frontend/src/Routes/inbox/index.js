import {connect} from 'react-redux';
import Inbox from './Inbox';

const s2p = state => {
  console.log('s2p')
  console.log('state.inbox:')
  console.log(state.inbox)

  return {
    messages: state.inbox.messages
  }
}

const d2p = dispatch => {
  return {
    
  }
}

export default connect(s2p, d2p)(Inbox);

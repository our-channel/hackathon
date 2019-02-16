import {connect} from 'react-redux';
import Contacts from './Contacts';

const s2p = state => {
  return {
    web3: state.web3.web3,
    idContract: state.web3.idContract,
    idFactory: state.web3.idFactory
  }
}

const d2p = (dispatch,ownProps) => {

  return {
    createID: async () => {
      let web3 = ownProps.web3;
      let addrs = await web3.getAccounts();
      let idFactory = ownProps.idFactory;
      console.log("Address", addrs[0]);

      return idFactory.createChannel(addrs[0])
              .then(r=>{
                console.log("Create channel result", r);
              })
              .catch(e=>{
                console.log("Create channel failed",e);
              })
    }
  }
}

export default connect(s2p, d2p)(Contacts);

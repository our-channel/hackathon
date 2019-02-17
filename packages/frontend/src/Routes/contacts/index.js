import {connect} from 'react-redux';
import Contacts from './Contacts';
import Contact from 'Model/Contact';
import {default as conOps} from 'Redux/contacts/operations';

const s2p = state => {
  //TODO: need to query ID contract to get list of contacts
  let w3 = state.web3;
  let acct = null;
  if(w3 && w3.account) {
    acct = w3.account;
  }

  return {
    contacts: [new Contact({
      idContractAddress: acct //just mocked up
    })]
  }
}

const d2p = (dispatch,ownProps) => {

  return {
    createID: async () => {
      let web3 = ownProps.web3;
      let addrs = await web3.getAccounts();
      let idFactory = ownProps.idFactory;

      return idFactory.createChannel(addrs[0])
              .then(r=>{
                console.log("Create channel result", r);
              })
              .catch(e=>{
                console.log("Create channel failed",e);
              })
    },

    showAdd: () => {
      dispatch(conOps.toggleAdd())
    }
  }
}

export default connect(s2p, d2p)(Contacts);

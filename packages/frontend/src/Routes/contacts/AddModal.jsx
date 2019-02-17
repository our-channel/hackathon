import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Input
} from 'reactstrap';
import React from 'react';
import Loading from 'Components/Elements/LoadingOverlay';

export default class AddModal extends React.Component {

  constructor(props) {
    super(props);
    [
      'changeProp',
      'search',
      'addToWL'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    });
    this.state = {}
  }

  search() {
    let s = this.state.search;
    if(!s || s.trim().length === 0) {
      return;
    }
    this.props.search(s)
    .then(r=>{
      this.setState({
        searchResults: r
      })
    })
  }

  addToWL(addr) {
    this.props.addToWL(this.state.search, addr)
    .then(r=>{

    })
  }

  changeProp(id, val) {
    this.setState({
      [id]: val
    });
  }

  render() {
    const {
      loading,
      error,
      showing,
      searchResults
    } = this.props;

    let {
      search
    } = this.state;

    return (

      <Modal isOpen={showing} toggle={this.props.cancel}
              size="lg"
              className="mt-0 mt-md-5">
        <Loading show={loading} />

        <ModalHeader className="modal-header"
                     toggle={this.props.cancel}>
              <i className="fa fa-envelope-o header-icon mr-2" />
              Add Contact
        </ModalHeader>
        <ModalBody className="w-100">
        {
          error &&
             <div className="w-100 error d-flex justify-content-center align-items-center">
              {error.message}
             </div>
        }
        <form className="form" role="form" autoComplete="off">
          <div className="w-100 form-row py-2 justify-content-center align-items-center">
            <label htmlFor="sendTo" className="col-sm-2 mb-0">
              Name or Address
            </label>
            <div className="col">
              <Input
                type="text"
                name="search"
                onChange={e=>this.changeProp('search', e.target.value)}
                className="form-control"
                value={search}
              />

            </div>
            <div className="col h-100 justify-content-center align-items-center">
              <button type="button"
                      onClick={this.search}>
                <i className="fa fa-search"/>
              </button>
            </div>
          </div>

          {
            searchResults && searchResults.length > 0 &&
            <div className="w-100 border form-row py-2 justify-content-center align-items-center">
              <label htmlFor="sendTo" className="col-sm-2 mb-0">
                ID Address:
              </label>
              <div className="col">
                {searchResults[0]}
              </div>
              <div className="col h-100 justify-content-center align-items-center">
                <button type="button"
                        onClick={()=>{
                          this.addToWL(searchResults[0])
                        }}>
                  <i className="fa fa-plus"/>
                </button>
              </div>
            </div>
          }



          <div className="form-row py-2">
            <div className="col-sm-auto py-1">
              <button
                type="button"
                onClick={()=>this.props.cancel()}
                className="btn btn-outline-secondary btn-block"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>

        </ModalBody>
      </Modal>
    );
  }
}

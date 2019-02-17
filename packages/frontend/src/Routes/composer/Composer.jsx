import React from 'react';

import {
  Modal,
  ModalBody,
  ModalHeader,
  Input
} from 'reactstrap';

import Loading from 'Components/Elements/LoadingOverlay';

export default class Composer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ""
    };

    [
      'changeProp',
      'sendMsg',
      'newId'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    });
  }

  changeProp(id, body) {
    this.setState({
      [id]: body
    });
  }

  newId() {
    this.props.createID()
  }

  sendMsg() {
    let msg = {
      subject: this.state.subject,
      body: this.state.body,
      timestamp: Date.now()
    }
    this.props.sendMessage(this.state.to, msg)
    .then(()=>{
      this.setState({
        to: "",
        subject: "",
        body: ""
      });
    });
  }

  render() {
    const {showing, loading, error} = this.props;
    const {to, subj, body} = this.state;

    return (
      <Modal isOpen={showing} toggle={this.props.cancel}
              size="lg"
              className="composer mt-0 mt-md-5">
        <Loading show={loading} />

        <ModalHeader className="modal-header"
                     toggle={this.props.cancel}>
              <i className="fa fa-envelope-o header-icon mr-2" />
              Compose Message
        </ModalHeader>
        <ModalBody className="w-100">
        {
          error &&
             <div className="w-100 error d-flex justify-content-center align-items-center">
              {error.message}
             </div>
        }
        <form className="form" role="form" autoComplete="off">
          <div className="w-100 form-row py-2">
            <label htmlFor="sendTo" className="col-sm-2 mb-0">
              To
            </label>
            <div className="col">
              <Input
                type="text"
                name="sendTo"
                onChange={e=>this.changeProp('to', e.target.value)}
                className="form-control"
                value={to}
              />
            </div>
          </div>
          <div className="form-row py-2">
            <label htmlFor="subject" className="col-sm-2 mb-0">
              Subject
            </label>
            <div className="col">
              <input
                type="text"
                name="subject"
                id="subject"
                value={subj}
                onChange={e=>this.changeProp('subject', e.target.value)}
                className="form-control"
                required=""
              />
            </div>
          </div>
          <div className="form-row py-2">
            <label htmlFor="message2" className="col-sm-2 mb-0">
              Message
            </label>
            <div className="col">
              <textarea
                rows="6"
                name="message2"
                id="message2"
                value={body}
                onChange={e=>this.changeProp('body', e.target.value)}
                className="form-control"
                required=""
              />
            </div>
          </div>
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
            <div className="col-sm-auto py-1">
              <button
                type="button"
                onClick={()=>this.props.createID()}
                className="btn btn-outline-secondary btn-block"
              >
                Create ID
              </button>
            </div>
            <div className="col py-1">
              <button
                type="button"
                onClick={this.sendMsg}
                className="btn btn-secondary float-right ml-1"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>

        </ModalBody>
      </Modal>
    );
  }
}

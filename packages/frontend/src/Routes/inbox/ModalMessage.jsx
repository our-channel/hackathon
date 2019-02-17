import React from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Row,
    Col,
} from 'reactstrap';

export class ModalMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modal:true}
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.message !== prevProps.message) {
      this.setState({modal:true});
    }
  }

  render() {
      return(
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
            <ModalHeader toggle={this.props.toggle}>
              <div>
                <small className="text-uppercase text-muted">Subject</small>
                <h4 className="modal-title">{this.props.message.subject}</h4>
              </div>
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col sm={8}>
                  <small className="text-uppercase text-muted">From</small>
                  <h4>
                    <a href="'mailto:'+selected.address">
                      {this.props.message.address}
                    </a>
                  </h4>
                </Col>
                <Col sm={4}>
                  <small className="text-uppercase text-muted">Sent</small>
                  <h6>{this.props.message.time}</h6>
                </Col>
                <Col sm={12}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.props.message.message
                    }}
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={this.props.toggle}>Reply</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
      );
  }
}

export default ModalMessage;

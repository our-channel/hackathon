import React from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

export class ProgressModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return(
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
            <ModalHeader toggle={this.props.toggle}>
                Setting up your account...
            </ModalHeader>
            <ModalBody>
                <div className="image-container">
                <img src={require('../../imgs/bifficorn.png')} alt='logo'
                            height='300px' className="loading-image"
                />
                </div>
            </ModalBody>
            <ModalFooter>
        </ModalFooter>
    </Modal>
      );
  }
}

export default ProgressModal;

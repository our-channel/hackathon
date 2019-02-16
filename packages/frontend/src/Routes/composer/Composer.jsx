import React from 'react';

import {
  Row,
  Col,
  Button
} from 'reactstrap';

export default class Composer extends React.Component {
  newId() {
    this.props.createID()
  }

  sendMsg() {
    this.props.sendMessage()
  }

  render() {
    return (
      <div className="d-flex w-100 h-100 justify-content-center align-items-center">
         <Row>
          <Col md="3" className="mr-2">
            <Button color="warning" onClick={this.newId.bind(this)}>Create ID</Button>
          </Col>
          <Col md="3">
            <Button color="warning" onClick={this.sendMsg.bind(this)}>Send Message</Button>
          </Col>
         </Row>
      </div>
    )
  }
}

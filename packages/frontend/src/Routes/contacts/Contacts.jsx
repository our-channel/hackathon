import React from 'react';

import {
  Row,
  Col,
  Input,
  Button
} from 'reactstrap';

import AddModal from './AddModalContainer';

class ContactItem extends React.Component {
  render() {
    const {
      contact
    } = this.props;
    if(!contact || !contact.idContractAddress) {
      return null;
    }
    return (
      <Row className="contact no-gutters d-flex w-80 mt-1 justify-content-center align-items-center">
        <Col md="1" className="icon d-flex justify-content-center align-items-center">
          {contact.blockie}
        </Col>
        <Col md="4" className="d-flex flex-column justify-content-start align-items-center">
          <Row className="addr-row w-100 d-flex justify-content-start align-items-start">
            <Col md="3" className="addr-label">
              Name:
            </Col>
            <Col  className="addr-value">
              {contact.name || "Unknown"}
            </Col>
          </Row>
          <Row className="addr-row w-100 d-flex justify-content-start align-items-start">
            <Col md="3" className="no-gutters addr-label">
              Address:
            </Col>
            <Col  className="addr-value">
              {contact.idContractAddress.substring(0,20) + "..."}
            </Col>
            <Col md="2">
              <span className="copy">
                <i className="fa fa-copy" />
              </span>
            </Col>
          </Row>
        </Col>
        <Col md="3" className="d-flex align-items-center justify-content-start">
          <span className="send">
            <i className="fa fa-envelope" />
          </span>
        </Col>
      </Row>
    )
  }
}

class CHeader extends React.Component {
  render() {
    return (
      <Row className="d-flex w-50 justify-content-center align-items-center">
        <Col md="3" className="d-flex justify-content-center align-items-center">
          <span className="header-text">Contacts</span>

        </Col>
        <Col md="6" className="d-flex justify-content-start align-items-center">
          <Button onClick={this.props.showAdd}>+</Button>
        </Col>
      </Row>
    )
  }
}

export default class Contacts extends React.Component {
  render() {
    const {
      contacts
    } = this.props;

    return (

        <div className="contacts d-flex flex-column mt-5 justify-content-center align-items-center">
          <AddModal />
          <CHeader showAdd={this.props.showAdd}/>
          {
            contacts.map((c,i)=>{
              return (<ContactItem contact={c} key={i} />);
            })
          }
        </div>
    )
  }
}

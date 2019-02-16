import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import {connect} from 'react-redux';

import Topbar from 'Components/Topbar';
import Sidebar from 'Components/Sidebar';

import inbox from './inbox';
import contacts from './contacts';
import Composer from './composer';

import {default as initOps} from 'Redux/init/operations';

import {
  Row,
  Col
} from 'reactstrap';

class MainApp extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { match } = this.props;

    return (
      <div className="app-container container-fluid mr-0 ml-0 pr-0 pl-0">
        <Topbar />
        <Composer />

        <Row className="no-gutters w-100">
          <Col md="1" className="d-flex flex-column justify-content-center align-items-start">
            <Sidebar />
          </Col>
          <Col md="11">
            <Switch>
              <Route path={`${match.url}/inbox`} component={inbox} />
              <Route path={`${match.url}/contacts`} component={contacts} />
              <Redirect to="/error" />
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {}
};

const d2p = dispatch => {
  return {
    init: () => dispatch(initOps.init())
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    d2p
  )(MainApp)
);

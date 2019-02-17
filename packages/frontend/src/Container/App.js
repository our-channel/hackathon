
// Import Main styles for this application
import 'scss/style.css'
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
import "react-table/react-table.css";
import 'react-quill/dist/quill.snow.css';

import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route,Switch } from "react-router-dom";
import { defaultStartPath } from "Constants/defaultValues";
import MainRoute from "Routes";
import Signup from "../Components/Signup";
import error from "Routes/error";
import ReduxToastr from 'react-redux-toastr';
import {default as initOps} from 'Redux/init/operations';

/*
if (location.pathname === '/'  || location.pathname==='/landing'|| location.pathname==='/landing/') {
  return (<Redirect to={defaultStartPath} />);
}
*/

class App extends Component {
  componentDidMount(){
    this.props.init();
  }
  render() {
    
    const { location, match } = this.props;
    if (location.pathname === '/') {
      return (<Redirect to={defaultStartPath} />);
    }

    return (
      <Fragment>
        <ReduxToastr
          timeOut={5000}
          newestOnTop={true}
          preventDuplicates
          position="top-right"
          transitionIn="bounceIn"
          transitionOut="bounceOut"
          progressBar/>
          <Switch>
            <Route path={`${match.url}app`} component={MainRoute} />
            <Route path={`${match.url}signup`} component={Signup} />
            <Route path={`/error`} component={error} />
            <Redirect to="/error" />
          </Switch>
        </Fragment>
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

export default connect(
  mapStateToProps,
  d2p
)(App);

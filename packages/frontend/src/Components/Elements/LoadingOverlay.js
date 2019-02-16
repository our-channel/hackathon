import React from 'react';


export default class Loading extends React.Component {
  render() {
    const {
      show
    } = this.props;
    if(!show) {
      return null;
    }
    return (
      <div className="loading d-flex justify-content-center align-items-center">

          <i className="fa fa-spinner fa-spin"/>

      </div>
    )
  }
}

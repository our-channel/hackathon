import React, { Component } from "react";
import { InboxHtml } from "./InboxHtml";
import ModalMessage from "./ModalMessage";

export class Inbox extends Component {
  constructor(props) {
    super(props);
    this.doShow = this.doShow.bind(this);
    this.ModalMessage = React.createRef();
    this.state = {
      selected: {},
      showMessage: false,
    };
    this.toggleMessageView = this.toggleMessageView.bind(this);
  }

  renderMessage = () => {
    return this.state.showMessage ? (
      <ModalMessage message={this.state.selected}
      modal={this.state.showMessage}
      toggle={this.toggleMessageView}/>
    ) : null;
  };
  doShow(idx) {
    this.setState({
      selected: this.props.messages[idx],
      showMessage: true
    });
  }

  toggleMessageView() {
    this.setState({
      showMessage: !this.state.showMessage
    });
  }

  render() {
    console.log('re-rendering')
    return (
      <div>
        <InboxHtml parent={this} messages={this.props.messages} />
        {this.renderMessage()}
      </div>
    );
  }
}

export default Inbox;

import React, { Component } from "react";
import { InboxHtml } from "./InboxHtml";
import ModalMessage from "./ModalMessage";

export class Inbox extends Component {
  constructor(props) {
    super(props);
    this.markRead = this.markRead.bind(this);
    this.doShow = this.doShow.bind(this);
    this.doDelete = this.doDelete.bind(this);
    this.toggleMark = this.toggleMark.bind(this);
    this.toggleMarkAll = this.toggleMarkAll.bind(this);
    this.deleteMarked = this.deleteMarked.bind(this);
    this.refreshMessages = this.refreshMessages.bind(this);
    this.deleteMessages = this.deleteMessages.bind(this);
    this.ModalMessage = React.createRef();
    this.ModalCompose = React.createRef();
    this.state = {
      initMessages: this.props.messages,
      messages: this.props.messages,
      selected: {},
      showMessage: false,
      deleted: []
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

  markRead(idx) {
    /* mark this message as read */
    let messages = [...this.state.messages];
    messages[idx].read = true;
    this.setState({ messages });
  }

  doShow(idx) {
    this.markRead(idx);
    this.setState({
      selected: this.props.messages[idx],
      showMessage: true
    });

    /* open message in modal */
    //this.ModalMessage.current.show();
  }

  toggleMessageView() {
    this.setState({
      showMessage: !this.state.showMessage
    });
  }

  toggleMark(idx) {
    let messages = [...this.state.messages];
    messages[idx].marked = messages[idx].marked ? 0 : 1;
    this.setState({ messages });
  }

  doDelete(idx) {
    let messages = [...this.state.messages];
    let deleted = [...this.state.deleted];
    /* append it to deleted */
    deleted.push(messages[idx]);
    /* remove the message at idx */
    messages.splice(idx, 1);
    this.setState({ messages, deleted });
  }

  toggleMarkAll() {
    let messages = [...this.state.messages];
    messages.map((v, k) => {
      return (v.marked = v.marked ? 0 : 1);
    });
    this.setState({ messages });
  }

  deleteMarked() {
    var self = this;
    let messages = [...this.state.messages];
    var tbd = [];
    for (var k = 0; k < messages.length; k++) {
      if (messages[k].marked === 1) {
        tbd.push(k);
      }
    }

    if (tbd.length > 0) {
      self.deleteMessages(tbd);
    }
  }

  refreshMessages() {
    let initMessages = [...this.state.initMessages];
    this.setState({ messages: initMessages });
  }

  deleteMessages(arr) {
    let messages = [...this.state.messages];
    let deleted = [...this.state.deleted];
    for (var i = arr.length - 1; i >= 0; i--) {
      deleted.push(messages[i]);
      messages.splice(arr[i], 1);
    }
    this.setState({ messages, deleted });
  }
  componentDidUpdate(prevProps){
    if(this.props.messages !== prevProps.messages){
      this.setState({messages: this.props.messages})
    }
  }
  render() {
    return (
      <div>
        <InboxHtml parent={this} />
        {this.renderMessage()}
      </div>
    );
  }
}

export default Inbox;

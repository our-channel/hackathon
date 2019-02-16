
export default class Message {
  constructor(props) {
    this.timestamp = props.timestamp;
    this.subject = props.subject;
    this.sender = props.sender;
    this.body = props.body;
  }
}

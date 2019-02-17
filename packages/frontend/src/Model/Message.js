
export default class Message {
  constructor(props) {
    this.id = props.id;
    this.timestamp = props.timestamp;
    this.subject = props.subject;
    this.sender = props.sender;
    this.body = props.body;
    this.read = props.read;
  }
}

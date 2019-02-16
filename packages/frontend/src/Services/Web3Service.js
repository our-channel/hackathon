
let inst = null;

export default class Web3Service {
  static get instance() {
    if(!inst) {
      inst = new Web3Service();
    }
    return inst;
  }

  constructor() {

  }
}

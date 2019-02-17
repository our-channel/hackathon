
const ABI = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "userName",
        "type": "string"
      }
    ],
    "name": "UserRegistered",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "userAddress",
        "type": "address"
      },
      {
        "name": "userName",
        "type": "string"
      }
    ],
    "name": "RegisterUser",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "GetNameByAddress",
    "outputs": [
      {
        "name": "userName",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "userName",
        "type": "string"
      }
    ],
    "name": "GetAddressByName",
    "outputs": [
      {
        "name": "userAddress",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

export default class UserRegistryService {
  constructor(props) {
    this.contract = new props.web3.eth.Contract(ABI, props.contractAddress);
		this.web3 = props.web3;
		this.from = props.account;

    [
      'search'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    });
  }

  async search(userOrAddr) {

		return new Promise((done,err)=>{
			let fn = null;
      if(userOrAddr.startsWith("0x")) {
        fn = this.contract.methods.GetNameByAddress;
      } else {
        fn = this.contract.methods.GetAddressByName;
      }
			fn(userOrAddr)
	          .call({
							from: this.from,
              gasLimit: 100000
						})
            .then(res=>{
              done(res)
            })
						.catch(e=>{
							err(e);
						});

		});
  }
}

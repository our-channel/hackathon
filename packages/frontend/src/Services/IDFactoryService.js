
const ABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "GetMyChannelContractAt",
		"outputs": [
			{
				"name": "holderAddress",
				"type": "address"
			},
			{
				"name": "channelContractAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "createChannel",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetMyChannelContractCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "holderAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "channelContractAddress",
				"type": "address"
			}
		],
		"name": "ChannelCreated",
		"type": "event"
	}
];

export default class IDContractService {

  constructor(props) {
    this.contract = new props.web3.eth.Contract(ABI, "0x3f7fc56f6e8e32cec32f09298f4f41b1abd7ebbc");
    [
      'createChannel'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    });
  }

  async createChannel(address) {
    return this.contract.methods.createChannel(address).send({from: address})
            .then(r=>{
              console.log("RESULT", r);
            })
            .catch(e=>{
              console.log("Freaking problem", e);
            })
  }

}

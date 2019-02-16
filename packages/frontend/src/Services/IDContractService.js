
const ABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "GetOwner",
		"outputs": [
			{
				"name": "",
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
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "SetOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "contactChannelAddress",
				"type": "address"
			},
			{
				"name": "publickey",
				"type": "bytes"
			}
		],
		"name": "AddContactToWhitelist",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "contact",
				"type": "address"
			}
		],
		"name": "GetContactPublicKey",
		"outputs": [
			{
				"name": "publicKey",
				"type": "bytes"
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
				"name": "senderChannelAddress",
				"type": "address"
			},
			{
				"name": "ipfsAddress",
				"type": "bytes"
			},
			{
				"name": "v",
				"type": "uint8"
			},
			{
				"name": "r",
				"type": "bytes32"
			},
			{
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "AddMessage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "verificationInfo",
		"outputs": [
			{
				"name": "",
				"type": "bytes"
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
				"name": "ipfsAddress",
				"type": "bytes"
			},
			{
				"name": "v",
				"type": "uint8"
			},
			{
				"name": "r",
				"type": "bytes32"
			},
			{
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "recoverPublicKey",
		"outputs": [
			{
				"name": "sender",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
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
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ipfs_address",
				"type": "bytes"
			}
		],
		"name": "MessageReceived",
		"type": "event"
	}
];

export default class IDContractService {
  constructor(props) {
    this.contract = new props.web3.eth.Contract(ABI, props.contractAddress);
		this.web3 = props.web3;
		this.from = props.account;

    [
      'sendMessage'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    });
  }

  async sendMessage(senderChannel, ipfsUrl) {
		console.log("This from address", this.from);

    //TODO: sign the freaking ipfsUrl
    await this.contract.methods.AddMessage(senderChannel, ipfsUrl, 1, this.web3.utils.fromAscii("0x100"), this.web3.utils.fromAscii("0x200"))
          .send({
						from: this.from
					}).then(r=>{
            console.log("Add message result", r);
          })
          .catch(e=>{
            console.log("ERROR", e);
          });
  }
}

import {
	RELAY_ADDRESS
} from 'Constants/Addresses';

const ABI = [
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
			},
			{
				"indexed": false,
				"name": "publicKey",
				"type": "string"
			}
		],
		"name": "ChannelCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "targetAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ipfs_address",
				"type": "string"
			}
		],
		"name": "MessageRelayed",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			},
			{
				"name": "publicKey",
				"type": "string"
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
				"name": "targetContractAddress",
				"type": "address"
			},
			{
				"name": "senderChannelAddress",
				"type": "address"
			},
			{
				"name": "ipfsAddress",
				"type": "string"
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
		"name": "RelayMessage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export default class IDContractService {

  constructor(props) {
		this.from = props.account;
		this.address = RELAY_ADDRESS;
    this.contract = new props.web3.eth.Contract(ABI, this.address);
    [
      'createChannel',
			'relayMessage'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    });
  }

  async createChannel(address, encKey) {
    return this.contract.methods.createChannel(address, encKey).send({from: address})
            .then(r=>{
              console.log("RESULT", r);
            })
            .catch(e=>{
              console.log("Freaking problem", e);
            })
  }

	async relayMessage(targetAddress, senderAddress, ipfsUrl, sig) {
		//address targetContractAddress, address senderChannelAddress, string memory ipfsAddress, uint8 v, bytes32 r, bytes32 s

		return new Promise((done,err)=>{
			let txnHash = [];
			this.contract.methods.RelayMessage(targetAddress, senderAddress, ipfsUrl, sig.v, sig.r, sig.s)
					.send({
						from: this.from
					})
					.on('transactionHash', hash => {
						txnHash.push(hash);
					})
					.on('confirmation', (confirmationNumber) => {
						if (confirmationNumber === 1) {
							done(txnHash[0])
						}
					})
					.on('error', (error) => {
						err(error)
					})
					.catch(e=>{
						err(e);
					});
				});
	}

}

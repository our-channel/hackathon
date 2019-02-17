import KeyManager from 'Services/KeyManager';

const ABI = [
	{
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_publicKey",
				"type": "string"
			}
		],
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
				"type": "string"
			}
		],
		"name": "MessageReceived",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_logTitle",
				"type": "string"
			},
			{
				"name": "_logAddress",
				"type": "address"
			},
			{
				"name": "_logString",
				"type": "string"
			},
			{
				"name": "_logUint",
				"type": "uint256"
			}
		],
		"name": "AddLogMessage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetLogListCount",
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
		"name": "GetLogListAt",
		"outputs": [
			{
				"name": "_logTitle",
				"type": "string"
			},
			{
				"name": "_logAddress",
				"type": "address"
			},
			{
				"name": "_logString",
				"type": "string"
			},
			{
				"name": "_logUint",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
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
		"constant": true,
		"inputs": [],
		"name": "GetPublicKey",
		"outputs": [
			{
				"name": "publicKey",
				"type": "string"
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
				"name": "contactChannelAddress",
				"type": "address"
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
		"name": "IsContactInWhitelist",
		"outputs": [
			{
				"name": "exist",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetWhitelistedContacts",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
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
		"name": "AddMessage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"name": "AddMessageEx",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
	}
];

export default class IDContractService {
  constructor(props) {
    this.contract = new props.web3.eth.Contract(ABI, props.contractAddress);
		this.web3 = props.web3;
		this.from = props.account;
		this.whitelisted = [];

    [
      'sendMessage',
			'getEncryptionKey',
			'addToWhitelist',
			'retrieveWhitelist'
    ].forEach(fn=>{
      this[fn] = this[fn].bind(this);
    });
  }

  sendMessage(senderChannel, ipfsUrl, sig) {

		return new Promise((done,err)=>{
			let txnHash = [];
			let fromAscii = this.web3.utils.fromAscii;
			this.contract.methods.AddMessage(senderChannel, ipfsUrl, sig.v, sig.r, sig.s)
	          .send({
							from: this.from
						})
						.on('transactionHash', hash => {
							console.log("Hash", hash);
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
						})
		});
  }

	getEncryptionKey() {

		if(!this.encKey) {
			//TODO: go out to chain if not already done
			this.encKey = KeyManager.instance.publicEncryptionKey;
		}
		return this.encKey;
	}

	addToWhitelist(address) {
		return new Promise((done,err)=>{
			let txnHash = [];
			this.contract.methods.AddContactToWhitelist(address)
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
				})
		});
	}

	async retrieveWhitelist() {
		let r = await this.contract.methods.GetWhitelistedContacts()
						.call({
							from:this.from,
							gasLimit: 100000
						});
		return r;
	}
}

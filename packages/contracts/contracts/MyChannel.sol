pragma solidity >=0.4.20;

contract MyChannel {
    bytes public verificationInfo;
    /* address verifiedBy; // Set by Issure proposing a verifier
    bool    verified;   // Set by proposed verifier */
    address owner;

    string pubicKey;

    mapping (address => bytes) contactWhitelist; // contact_address to contact_publickey

    /* event WalletVerified(address indexed _verifiedBy, address walletAddress); */

    event MessageReceived(address sender , string ipfs_address);

    constructor() public{
        /* verified   = false;
        verifiedBy = address(0); */
    }

    function SetOwner(address _owner) public {
        owner = _owner;
    }

    function GetOwner() public view returns (address){
        return owner;
    }

    function SetPublicKey(string memory _publicKey) public {
             pubicKey = _publicKey;
    }

    function GetPublicKey() public view returns (string memory publicKey) {
        return pubicKey;
    }


/*
    function SetMetaInfo(bytes _info) public {
        verificationInfo = _info;
    }

    function GetMetaInfo() public view returns (bytes){
        return verificationInfo;
    } */

    /* function SetVerifiedBy() public {
        if (msg.sender == verifiedBy) { // if the message sender is the one who has proposed by contract owner, allow to proceed
            verified = true;
        }
    } */

    /* function GetVerifiedBy() public view returns(address) {
        return verifiedBy;
    } */

    /* function IsVerified() public view returns (bool){
        return verified;
    } */

    function AddContactToWhitelist (address contactChannelAddress, bytes memory publickey) public {
        contactWhitelist[contactChannelAddress] = publickey;
    }

    function GetContactPublicKey (address contact) public view returns(bytes memory publicKey) {
        publicKey = contactWhitelist[contact];
    }

    function AddMessage (address senderChannelAddress, string memory ipfsAddress, uint8 v, bytes32 r, bytes32 s) public {
        /* address senderPublicKey = this.recoverPublicKey(ipfsAddress,v,r,s); */

        emit MessageReceived(senderChannelAddress, ipfsAddress );

        /* if ( require(senderPublicKey == contactWhitelist[senderChannelAddress]))
            emit MessageReceived(senderChannelAddress, ipfsAddress );
        else
            emit MessageReceived(senderChannelAddress, 0 );         */


        /* require(senderPublicKey == contactWhitelist[senderChannelAddress]); */
        /* emit MessageReceived(senderChannelAddress, ipfsAddress ) */

    }

    function recoverPublicKey(bytes calldata ipfsAddress, uint8 v, bytes32 r, bytes32 s) external pure returns (address sender) {
            bytes32 msgHash = keccak256(abi.encodePacked(ipfsAddress));
            return ecrecover(msgHash, v, r, s);
    }

}

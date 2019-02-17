pragma solidity >=0.4.20;

contract MyChannel {

//////////////////////////////////////
    struct LogMessage {
        string  logTitle;
        address logAddress;
        string  logString;
        uint    logUint;
    }

    LogMessage[] logMessageList;

    function AddLogMessage(string memory  _logTitle, address _logAddress, string memory _logString,uint _logUint ) public{
        logMessageList.push(LogMessage({
            logTitle:_logTitle,
            logAddress:_logAddress,
            logString:_logString,
            logUint:_logUint}));
    }

    function GetLogListCount () public view returns(uint) {
        return logMessageList.length;
    }

    function GetLogListAt (uint index) public view returns(string  memory _logTitle,address _logAddress, string memory _logString, uint _logUint) {
        LogMessage memory _logMessage = logMessageList[index];
        _logTitle = _logMessage.logTitle;
        _logAddress = _logMessage.logAddress;
        _logString = _logMessage.logString;
        _logUint = _logMessage.logUint;
    }
//////////////////////////////////////

    address owner;
    string pubicKey;
    mapping (address => bool) contactWhitelistMap; // contact_address to contact_publickey
    address[] contactWhitelistArray;
    event MessageReceived(address sender , string ipfs_address);

    constructor(address _owner,string memory _publicKey) public{
        owner = _owner;
        pubicKey = _publicKey;
    }

    function GetOwner() public view returns (address){
        return owner;
    }

    function GetPublicKey() public view returns (string memory publicKey) {
        return pubicKey;
    }

    function AddContactToWhitelist (address contactChannelAddress) public {
        contactWhitelistMap[contactChannelAddress] = true;
        contactWhitelistArray.push(contactChannelAddress);
    }

    function IsContactInWhitelist(address contact) public view returns(bool exist) {
        exist = contactWhitelistMap[contact];
    }

    function GetWhitelistedContacts () public view returns(address[] memory ) {
        return contactWhitelistArray;
    }

    function AddMessage (address senderChannelAddress, string memory ipfsAddress, uint8 v, bytes32 r, bytes32 s) public {

        /*address senderPublicKey = this.recoverPublicKey(ipfsAddress,v,r,s); */
        emit MessageReceived(senderChannelAddress, ipfsAddress );

        /* if ( require(senderPublicKey == contactWhitelist[senderChannelAddress]))
            emit MessageReceived(senderChannelAddress, ipfsAddress );
        else
            emit MessageReceived(senderChannelAddress, 0 );         */


        /* require(senderPublicKey == contactWhitelist[senderChannelAddress]); */
        /* emit MessageReceived(senderChannelAddress, ipfsAddress ) */

    }

    function AddMessageEx(address senderChannelAddress, string memory ipfsAddress, uint8 v, bytes32 r, bytes32 s) public {

        bytes memory _ipfsAddress;
        address senderPublicKey = this.recoverPublicKey(_ipfsAddress,v,r,s);
        /* this.AddLogMessage(); */
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


    /* function stringToBytes32(string memory source) returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    } */

}

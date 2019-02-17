pragma solidity >=0.4.20;
import "./MyChannel.sol";
import "./UserRegistry.sol";
import "./RelayRecipient.sol";

contract MyChannelFactory is RelayRecipient {
    struct Holder {
        address holderAddress;
        address channelContractAddress;
    }

    Holder[] holderList;
    address userRegistryAddress;

    event ChannelCreated(address holderAddress, address channelContractAddress, string publicKey, string userName);
    event MessageRelayed(address targetAddress, address sender , string ipfs_address);

    constructor(address _userRegistryAddress) public{
        userRegistryAddress = _userRegistryAddress;
    }

    function createChannel(address userAddress, string memory publicKey, string memory userName) public returns(address)
    {
        address newChannelContractAddress;

        MyChannel newChannelContract = new MyChannel(userAddress,publicKey);

        newChannelContractAddress = address(newChannelContract);
        holderList.push(Holder({
            holderAddress:userAddress,
            channelContractAddress:newChannelContractAddress}));

        UserRegistry userRegistryInstance =  UserRegistry(userRegistryAddress);
        userRegistryInstance.RegisterUser(newChannelContractAddress,userName);

        emit ChannelCreated(userAddress, newChannelContractAddress,publicKey,userName);
        return newChannelContractAddress;
    }

    function GetMyChannelContractCount () public view returns(uint) {
        return holderList.length;
    }

    function GetMyChannelContractAt (uint index) public view returns(address holderAddress, address channelContractAddress) {
        Holder memory holder = holderList[index];
        holderAddress = holder.holderAddress;
        channelContractAddress = holder.channelContractAddress;
    }

    function RelayMessage(address targetContractAddress, address senderChannelAddress, string memory ipfsAddress, uint8 v, bytes32 r, bytes32 s) public {
        MyChannel targetInstance = MyChannel(targetContractAddress);
        targetInstance.AddMessage(senderChannelAddress, ipfsAddress, v,  r, s);

        emit MessageRelayed( targetContractAddress, senderChannelAddress , ipfsAddress);
    }

    function accept_relayed_call(address relay, address from, bytes memory encoded_function, uint gas_price, uint transaction_fee) public view returns(uint32) {
        return 0;
    }

    function post_relayed_call(address relay, address from, bytes memory encoded_function, bool success, uint used_gas, uint transaction_fee ) public {

    }


}

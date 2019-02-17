pragma solidity >=0.4.20;
import "./MyChannel.sol";
import "./RelayRecipient.sol";

contract MyChannelFactory is RelayRecipient {
    struct Holder {
        address holderAddress;
        address channelContractAddress;
    }

    Holder[] holderList;

    event ChannelCreated(address holderAddress, address channelContractAddress, string publicKey);
    event MessageRelayed(address targetAddress, address sender , string ipfs_address);

    function createChannel(address user, string memory publicKey) public returns(address)
    {
        address newChannelContractAddress;

        MyChannel newChannelContract = new MyChannel();
        newChannelContract.SetOwner(user);
        newChannelContract.SetPublicKey(publicKey);

        newChannelContractAddress = address(newChannelContract);
        holderList.push(Holder({
            holderAddress:user,
            channelContractAddress:newChannelContractAddress}));

        emit ChannelCreated(user, newChannelContractAddress,publicKey);
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
}

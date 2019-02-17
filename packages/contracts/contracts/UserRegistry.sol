pragma solidity >=0.4.20;

contract UserRegistry {

    mapping (address => string) usersByAddress;  // contact_address to user_name
    mapping (string => address) addressesbyUser; //user_name to contact_address

    event UserRegistered(address userAddress , string userName);

    constructor() public{
    }

    function RegisterUser (address userAddress, string memory userName) public {
        usersByAddress[userAddress] = userName;
        addressesbyUser[userName] = userAddress;
    }

    function GetNameByAddress (address userAddress) public view returns(string memory userName) {
        userName = usersByAddress[userAddress];
    }

    function GetAddressByName (string memory userName) public view returns(address userAddress) {
        userAddress = addressesbyUser[userName];
    }
}

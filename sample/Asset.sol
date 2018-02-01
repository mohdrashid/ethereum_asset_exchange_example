pragma solidity ^0.4.16;
import './Administered.sol';

contract Asset is Administered {
    string public name;
    uint private value;
    address public owner;
    
    event LogOwnerChanged(address oldOwner, address newOwner);
    event LogValueChanged(uint oldValue, uint newValue);

    
    function Asset(string assetName, address assetOwner, uint assetValue) public {
        name = assetName;
        value = assetValue;
        owner = assetOwner;
    }
    
    function transferOwnership(address newOwner) public requireAdministrator returns(bool success) {
        require(newOwner!=0);
        LogOwnerChanged(owner, newOwner);
        owner = newOwner;
        return true;
    }
    
    function changeValue(uint newValue) public requireAdministrator returns(bool success) {
        require(newValue!=0);
        LogValueChanged(value, newValue);
        value = newValue;
        return true;
    }

    function getValue() public constant returns(uint) {
        return value;
    }
    
}
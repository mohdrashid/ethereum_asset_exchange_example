pragma solidity ^0.4.16;
contract Administered {
    
    address public administrator;
    
    modifier requireAdministrator {
        require(administrator == msg.sender);
        _;
    }
    
    event LogAdministratorChanged(address oldAdmin, address newAdmin);
    
    function Administered() public {
        administrator = msg.sender;
    }
    
    function changeAdministrator(address newAdmin) public requireAdministrator returns(bool success){
        require(newAdmin!=0);
        administrator = newAdmin;
        LogAdministratorChanged(msg.sender,administrator);
        return true;
    }
}
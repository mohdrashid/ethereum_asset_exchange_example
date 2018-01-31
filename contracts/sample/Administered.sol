pragma solidity ^0.4.16;
contract Administered {
    
    address public adminstrator;
    
    modifier requireAdministrator {
        require(adminstrator == msg.sender);
        _;
    }
    
    event LogAdministratorChanged(address oldAdmin, address newAdmin);
    
    function Administered() public {
        adminstrator = msg.sender;
    }
    
    function changeAdministrator(address newAdmin) public requireAdministrator returns(bool success){
        require(newAdmin!=0);
        adminstrator = newAdmin;
        LogAdministratorChanged(msg.sender,adminstrator);
        return true;
    }
}
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Address.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IStablecoin.sol";

abstract contract BlackList is Ownable, ERC20Pausable {

    /////// Getters to allow the same blacklist to be used also by other contracts (including upgraded Tether) ///////
    function getBlackListStatus(address _maker) external view returns (bool) {
        return isBlackListed[_maker];
    }

    function getOwner() external view returns (address) {
        return owner();
    }

    mapping (address => bool) public isBlackListed;
    
    function addBlackList (address _evilUser) public onlyOwner {
        isBlackListed[_evilUser] = true;
        emit AddedBlackList(_evilUser);
    }

    function removeBlackList (address _clearedUser) public onlyOwner {
        isBlackListed[_clearedUser] = false;
        emit RemovedBlackList(_clearedUser);
    }

    function destroyBlackFunds (address _blackListedUser) public onlyOwner {
        require(isBlackListed[_blackListedUser]);
        uint dirtyFunds = balanceOf(_blackListedUser);
        _burn(_blackListedUser, dirtyFunds);
        emit DestroyedBlackFunds(_blackListedUser, dirtyFunds);
    }

    event DestroyedBlackFunds(address _blackListedUser, uint _balance);

    event AddedBlackList(address _user);

    event RemovedBlackList(address _user);

}

/**
 * @title MeterToken
 * @dev This contract is template for MTR stablecoins
 */
contract MeterToken is BlackList, AccessControl, IStablecoin {
    // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant VAULT_MANAGER_ROLE = keccak256("VAULT_MANAGER_ROLE");
    

    /**
     * @dev Creates an instance of `MeterToken` where `name` and `symbol` is initialized.
     * Names and symbols can vary from the pegging currency
     */
    constructor(string memory name, string memory symbol)
    ERC20(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());
        _mint(msg.sender, 100e18);
    }

    function mint(address to, uint256 amount) external override {
        // Check that the calling account has the minter role
        require(hasRole(MINTER_ROLE, msg.sender), "Meter: Caller is not a minter");
        _mint(to, amount);
    }

    function pause() external {
        // Check that the calling account has the pauser role
        require(hasRole(PAUSER_ROLE, _msgSender()), "Meter: must have pauser role to pause");
        _pause();
    }

    function unpause() external {
        // Check that the calling account has the pauser role 
        require(hasRole(PAUSER_ROLE, _msgSender()), "Meter: must have pauser role to unpause");
        _unpause();
    }

    function burn(uint256 amount) external override {
        // Check that the calling account has the burner role
        require(hasRole(BURNER_ROLE, _msgSender()), "Meter: must have burner role to burn");
        _burn(_msgSender(), amount);
    }

    function burnFrom(address account, uint256 amount) external override {
        uint256 currentAllowance = allowance(account, _msgSender());
        require(currentAllowance >= amount, "ERC20: burn amount exceeds allowance");
        _approve(account, _msgSender(), currentAllowance - amount);
        _burn(account, amount);
    }
}

// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "./interfaces/IMeta.sol";


contract MetaERC20 is ERC20PresetMinterPauser, IMeta {
    address public override meta;
    uint256 public override assetId;
    bytes public override data;
    constructor(string memory name, string memory symbol, address meta, uint256 assetId, bytes memory data) ERC20PresetMinterPauser(name, symbol) public {
        _setupRole(MINTER_ROLE, msg.sender);
        meta = meta;
        assetId = assetId;
        data = data;
    }
    function mint(address to, uint256 amount) public virtual override(ERC20PresetMinterPauser, IMeta) {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have minter role to mint");
        _mint(to, amount);
    }
}
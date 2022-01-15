// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Vault.sol";
import "./interfaces/IVaultFactory.sol";

import "../proxy/transparent/InitializableTransaparentUpgradeableProxy.sol";

contract VaultFactory is AccessControl, IVaultFactory {
  // Vaults
  address[] public allVaults;
  /// Address of uniswapv2 factory
  address public override v2Factory;
  /// Address of cdp nft registry
  address public override v1;
  /// Address of Wrapped Ether
  address public override WETH;
  /// Address of manager
  address public override manager;
  /// version number of impl
  uint32 version;
  /// address of upgrader
  address public upgrader;
  /// address of vault impl
  address public impl;

  constructor() {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    upgrader = address(1);
    _createImpl();
  }

  /// Vault can issue stablecoin, it just manages the position
  function createVault(
    address collateral_,
    address debt_,
    uint256 amount_,
    address recipient
  ) external override returns (address vault, uint256 id) {
    require(msg.sender == manager, "VaultFactory: IA");
    uint256 gIndex = allVaultsLength();
    IV1(v1).mint(recipient, gIndex);
    bytes memory bytecode = type(InitializableTransparentUpgradeableProxy)
      .creationCode;
    bytes32 salt = keccak256(abi.encodePacked("v", gIndex, msg.sender));
    address proxy = _createClone(impl);
    
    IVault(proxy).initialize(
      manager,
      gIndex,
      collateral_,
      debt_,
      v1,
      amount_,
      v2Factory,
      WETH
    );
    allVaults.push(proxy);
    return (proxy, gIndex);
  }

  function _createClone(address target) internal returns (address result) {
    // convert address to 20 bytes
    bytes20 targetBytes = bytes20(target);

    // actual code //
    // 3d602d80600a3d3981f3363d3d373d3d3d363d73bebebebebebebebebebebebebebebebebebebebe5af43d82803e903d91602b57fd5bf3

    // creation code //
    // copy runtime code into memory and return it
    // 3d602d80600a3d3981f3

    // runtime code //
    // code to delegatecall to address
    // 363d3d373d3d3d363d73 address 5af43d82803e903d91602b57fd5bf3

    assembly {
      /*
            reads the 32 bytes of memory starting at pointer stored in 0x40

            In solidity, the 0x40 slot in memory is special: it contains the "free memory pointer"
            which points to the end of the currently allocated memory.
            */
      let clone := mload(0x40)
      // store 32 bytes to memory starting at "clone"
      mstore(
        clone,
        0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000
      )

      /*
              |              20 bytes                |
            0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000
                                                      ^
                                                      pointer
            */
      // store 32 bytes to memory starting at "clone" + 20 bytes
      // 0x14 = 20
      mstore(add(clone, 0x14), targetBytes)

      /*
              |               20 bytes               |                 20 bytes              |
            0x3d602d80600a3d3981f3363d3d373d3d3d363d73bebebebebebebebebebebebebebebebebebebebe
                                                                                              ^
                                                                                              pointer
            */
      // store 32 bytes to memory starting at "clone" + 40 bytes
      // 0x28 = 40
      mstore(
        add(clone, 0x28),
        0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000
      )

      /*
              |               20 bytes               |                 20 bytes              |           15 bytes          |
            0x3d602d80600a3d3981f3363d3d373d3d3d363d73bebebebebebebebebebebebebebebebebebebebe5af43d82803e903d91602b57fd5bf3
            */
      // create new contract
      // send 0 Ether
      // code starts at pointer stored in "clone"
      // code size 0x37 (55 bytes)
      result := create(0, clone, 0x37)
    }
  }

  function _createImpl() internal {
    address addr;
    bytes memory bytecode = type(Vault).creationCode;
    bytes32 salt = keccak256(abi.encodePacked("vault", version));
    assembly {
      addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
      if iszero(extcodesize(addr)) {
        revert(0, 0)
      }
    }
    impl = addr;
  }

  function initialize(
    address v1_,
    address v2Factory_,
    address weth_,
    address manager_
  ) public {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
    v1 = v1_;
    v2Factory = v2Factory_;
    WETH = weth_;
    manager = manager_;
  }

  function setUpgrader(address upgrader_) public {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "IA"); // Invalid Access
    upgrader = upgrader_;
  }

  function getVault(uint256 vaultId_) external view override returns (address) {
    return allVaults[vaultId_];
  }

  function vaultCodeHash() external pure override returns (bytes32 vaultCode) {
    return
      keccak256(type(InitializableTransparentUpgradeableProxy).creationCode);
  }

  function allVaultsLength() public view returns (uint256) {
    return allVaults.length;
  }
}

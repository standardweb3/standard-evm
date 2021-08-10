pragma solidity ^0.8.0;

import './lib/proxy/UpgradableProxy.sol';

contract UChildERC20Proxy is UpgradableProxy {
    constructor(address _proxyTo) public UpgradableProxy(_proxyTo) {}
}
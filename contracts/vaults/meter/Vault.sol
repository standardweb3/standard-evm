pragma solidity ^0.8.0;

import '../../oracle/IPrice.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Vault {
    /// Price Feed Interface
    IPrice feed;
    /// Vault NFT interface
    IERC721 V1;
    /// Aggregator contract address to get processed price data
    address aggregator;
    /// Owner of a vault
    address owner;
    /// Address of a factory
    address factory;
    /// Address of meter;
    address meter;
    /// Address of vault ownership registry
    address v1;

    /// Collateral global identifier
    uint collateralId;

    /// Vault global identifier
    uint vaultId;

    constructor() public {
        factory = msg.sender;
    }

    modifier onlyVaultOwner(uint256 vaultId_) {
        V1 = IERC721(v1);
        require(V1.ownerOf(vaultId_) == msg.sender, "Vault: Vault is not owned by you");
        _;
    }

    // called once by the factory at time of deployment
    function initialize(uint collateralId_, uint vaultId_, address aggregator_, address owner_, address v1_, address meter_) external {
        require(msg.sender == factory, 'Vault: FORBIDDEN'); // sufficient check
        collateralId = collateralId_;
        vaultId = vaultId_;
        aggregator = aggregator_;
        owner = owner_;
        v1 = v1_;
        meter = meter_;
    }


    /// Get collateral value in 8 decimal */USD
    function _getCollateralValue() internal returns(int) {
        feed = IPrice(aggregator);
        return feed.getThePrice();
    }

    /// liquidate


}
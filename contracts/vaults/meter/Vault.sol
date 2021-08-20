pragma solidity ^0.8.0;

import '../../oracle/IPrice.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./IVault.sol";
import "./IV1.sol";
import "../../uniswapv2/interfaces/IMTRMarket.sol";
import "../../tokens/IStablecoin.sol";

contract Vault is IVault {
    /// Price Feed Interface
    IPrice feed;
    /// Vault NFT interface
    IERC721 V1;
    /// Market interface 
    IMTRMarket market;
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
    /// address of a collateral
    address collateral;

    /// Vault global identifier
    uint vaultId;

    /// debt amount 
    uint256 debt;

    /// stability fee
    uint256 stabilityFee;

    /// debt price aggregator
    address debtPrice;


    constructor() public {
        factory = msg.sender;
    }

    modifier onlyVaultOwner(uint256 vaultId_) {
        V1 = IERC721(v1);
        require(V1.ownerOf(vaultId_) == msg.sender, "Vault: Vault is not owned by you");
        _;
    }

    // called once by the factory at time of deployment
    function initialize(address collateral_, uint vaultId_, address aggregator_, address owner_, address v1_, address meter_, uint256 amount_) external {
        require(msg.sender == factory, 'Vault: FORBIDDEN'); // sufficient check
        collateral = collateral_;
        vaultId = vaultId_;
        aggregator = aggregator_;
        owner = owner_;
        v1 = v1_;
        meter = meter_;
        debt = amount_;
    }


    /// Get collateral value in 8 decimal */USD
    function _getCollateralValue() internal returns(int) {
        feed = IPrice(aggregator);
        return feed.getThePrice();
    }

    /// liquidate
    function _liquidate() internal {
        IMTRMarket(market).liquidate(collateral, meter, IERC20(collateral).balanceOf(address(this)), 0);
    }
    
    /// Deposit collateral
    function depositCollateralNative(uint256 amount_) payable public onlyVaultOwner {
        require(collateral == address(0), "Vault: collateral is not a native asset"); 
        emit DepositCollateral(vaultId, msg.value);        
    }

    /// Deposit collateral
    function depositCollateral(uint256 amount_) public onlyVaultOwner {
        IERC20(collateral).transferFrom(msg.sender, address(this), amount_);
        emit DepositCollateral(vaultId, msg.value);        
    }

    /// Withdraw collateral
    function withdrawCollateralNative(uint256 amount_) public onlyVaultOwner {
        require(collateral == address(0), "Vault: collateral is not a native asset");
        require(address(this).balance >= amount_, "Vault: Not enough collateral");

        
        if(debt != 0) {
            require(isValidCollateral(address(this).balance - amount_, debt), "Withdrawal would put vault below minimum collateral percentage");
        }

        msg.sender.transfer(amount_);

        emit WithdrawCollateral(vaultId, amount_);
    }

    /// Withdraw collateral
    function withdrawCollateral(uint256 amount_) public onlyVaultOwner {
        require(address(this).balance >= amount_, "Vault: Not enough collateral");

        
        if(debt != 0) {
            require(isValidCollateral(address(this).balance - amount_, debt), "Withdrawal would put vault below minimum collateral percentage");
        }

        IERC20(collateral).transfer(msg.sender, amount_);

        emit WithdrawCollateral(vaultId, amount_);
    }

    /// Close CDP
    function payback() public onlyVaultOwner {
        // calculate debt with interest
        // burn mtr debt with interest
        _burnMTRFromVault(debt);
        // burn vault nft
        _burnV1FromVault();
        emit PayBack(vaultId, debt, stabilityFee);
        // self destruct the contract
    }

    /// burn vault v1
    function _burnV1FromVault() internal {
        IV1(v1).burnFromVault(vaultId);
    }

    /// burn vault mtr
    function _burnMTRFromVault(uint256 amount_) internal {
        IStablecoin(meter).burnFrom(msg.sender, amount_);
    }

    function isValidCollateral(uint256 collateral, uint256 debt) private view returns (bool) {
        (uint256 collateralValueTimes100, uint256 debtValue) = calculateCollateralProperties(collateral, debt);

        uint256 collateralPercentage = collateralValueTimes100.div(debtValue);

        return collateralPercentage >= _minimumCollateralPercentage;
    }

    function calculateCollateralProperties(uint256 collateral, uint256 debt) private view returns (uint256, uint256) {
        assert(getEthPriceSource() != 0);
        assert(getTokenPriceSource() != 0);

        uint256 collateralValue = collateral.mul(getEthPriceSource() );

        assert(collateralValue >= collateral);

        uint256 debtValue = debt.mul(getTokenPriceSource());

        assert(debtValue >= debt);

        uint256 collateralValueTimes100 = collateralValue.mul(100);

        assert(collateralValueTimes100 > collateralValue);

        return (collateralValueTimes100, debtValue);
    }
}
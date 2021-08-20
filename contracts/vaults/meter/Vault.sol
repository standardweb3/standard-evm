pragma solidity ^0.8.0;

import '../../oracle/IPrice.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IVault.sol";
import "./IVaultManager.sol";
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
    /// Vault manager
    IVaultManager vltManager;
    /// Collateral Aggregator contract address to get processed price data
    address cAggregator;
    /// Debt Aggregator contract address to get processed price data
    address dAggregator;
    /// Address of a manager
    address manager;
    /// Address of debt;
    address debt;
    /// Address of vault ownership registry
    address v1;
    /// address of a collateral
    address collateral;
    /// Vault global identifier
    uint vaultId;
    /// borrowed amount 
    uint256 borrow;


    constructor() public {
        manager = msg.sender;
    }

    modifier onlyVaultOwner {
        V1 = IERC721(v1);
        require(V1.ownerOf(vaultId) == msg.sender, "Vault: Vault is not owned by you");
        _;
    }

    // called once by the factory at time of deployment
    function initialize(address collateral_, uint vaultId_, address cAggregator_, address dAggregator_, address v1_, address debt_, uint256 amount_) external {
        require(msg.sender == manager, 'Vault: FORBIDDEN'); // sufficient check
        collateral = collateral_;
        vaultId = vaultId_;
        cAggregator = cAggregator_;
        dAggregator = dAggregator_;
        v1 = v1_;
        debt = debt_;
        borrow = amount_;
    }


    /// Get collateral value in 8 decimal */USD
    function _getAssetPrice(address aggregator_) internal returns(uint) {
        feed = IPrice(aggregator_);
        return uint(feed.getThePrice());
    }

    /// liquidate
    function liquidate() public {
        if (collateral == address(0)) {
            require(!isValidCollateral(cAggregator, dAggregator, address(this).balance, IERC20(debt).balanceOf(address(this))), "Vault: Position is still safe");
            IMTRMarket(market).liquidate(collateral, debt, IERC20(collateral).balanceOf(address(this)), 0);
        } else {
            require(!isValidCollateral(cAggregator, dAggregator, IERC20(collateral).balanceOf(address(this)), IERC20(debt).balanceOf(address(this))), "Vault: Position is still safe");
            IMTRMarket(market).liquidate(collateral, debt, IERC20(collateral).balanceOf(address(this)), 0);
        }
    }
    
    /// Deposit collateral
    function depositCollateralNative() payable public onlyVaultOwner {
        require(collateral == address(0), "Vault: collateral is not a native asset"); 
        emit DepositCollateral(vaultId, msg.value);        
    }

    /// Deposit collateral
    function depositCollateral(uint256 amount_) public onlyVaultOwner {
        IERC20(collateral).transferFrom(msg.sender, address(this), amount_);
        emit DepositCollateral(vaultId, amount_);        
    }

    /// Withdraw collateral
    function withdrawCollateralNative() payable public onlyVaultOwner {
        require(collateral == address(0), "Vault: collateral is not a native asset");
        uint256 balance = address(this).balance;
        require(balance >= msg.value, "Vault: Not enough collateral");    
        if(borrow != 0) {
            require(isValidCollateral(cAggregator, dAggregator, balance - msg.value, borrow), "Withdrawal would put vault below minimum collateral percentage");
        }
        payable(msg.sender).transfer(msg.value);
        emit WithdrawCollateral(vaultId, msg.value);
    }

    /// Withdraw collateral
    function withdrawCollateral(uint256 amount_) public onlyVaultOwner {
        require(address(this).balance >= amount_, "Vault: Not enough collateral");
        if(borrow != 0) {
            require(isValidCollateral(cAggregator, dAggregator, IERC20(collateral).balanceOf(address(this)) - amount_, borrow), "Withdrawal would put vault below minimum collateral percentage");
        }
        IERC20(collateral).transfer(msg.sender, amount_);
        emit WithdrawCollateral(vaultId, amount_);
    }

    /// Close CDP
    function payback() public onlyVaultOwner {
        // calculate debt with interest
        // burn mtr debt with interest
        _burnMTRFromVault(borrow);
        // burn vault nft
        _burnV1FromVault();
        emit PayBack(vaultId, borrow, borrow); // replace this with stability fee 
        // self destruct the contract
    }

    /// burn vault v1
    function _burnV1FromVault() internal {
        IV1(v1).burnFromVault(vaultId);
    }

    /// burn vault mtr
    function _burnMTRFromVault(uint256 amount_) internal {
        IStablecoin(debt).burnFrom(msg.sender, amount_);
    }

    function isValidCollateral(address cAggregator_, address dAggregator_, uint256 cAmount_, uint256 dAmount_) private returns (bool) {
        (uint256 collateralValueTimes100, uint256 debtValue) = calculatePosition(cAggregator_, dAggregator_, cAmount_, dAmount_);

        uint256 collateralPercentage = collateralValueTimes100 / debtValue; // overflow check

        (uint mcr, uint lfr, uint sfr) = IVaultManager(manager).getCDPConfig(collateral);

        return collateralPercentage >= mcr;
    }

    function calculatePosition(address cAggregator_, address dAggregator_, uint256 cAmount_, uint256 dAmount_) private returns (uint256, uint256) {
        uint256 collateralValue = _getAssetValue(cAggregator_, cAmount_);
        uint256 debtValue = _getAssetValue(dAggregator_, dAmount_);
        uint256 collateralValueTimes100 = collateralValue * 100;
        assert(collateralValueTimes100 >= collateralValue); // overflow check
        return (collateralValue, debtValue);        
    }

    function _getAssetValue(address aggregator, uint256 amount_) internal returns (uint256) {
        uint price = _getAssetPrice(aggregator);
        assert(price != 0);
        uint256 assetValue = price * amount_;
        assert(assetValue >= amount_); // overflow check
        return assetValue;
    }
}
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/Math.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';

import './lib/Babylonian.sol';
import './lib/FixedPoint.sol';
import './lib/Safe112.sol';
import './owner/Operator.sol';
import './utils/ContractGuard.sol';
import './interfaces/IBitcoinAsset.sol';
import './interfaces/IOracle.sol';
import './interfaces/IBoardroom.sol';

/**
 * @title Bitcoin Dollar Reserve Bank contract
 * @notice Monetary policy logic to adjust supplies of bitcoin dollar tokens
 * @author Hyungsuk Kang
 */
contract ReserveBank is ContractGuard, Operator {
    using FixedPoint for *;
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;
    using Safe112 for uint112;

    /* ========= CONSTANT VARIABLES ======== */

    uint256 public constant PERIOD = 1 days;

    /* ========== STATE VARIABLES ========== */

    // flags
    bool private migrated = false;
    bool private initialized = false;

    // epoch
    uint256 public startTime;
    uint256 public epoch = 0;

    // core components
    address private cash;
    address private bond;
    address private share;
    address private boardroom;
    address private cashOracle;

    // exchangable assets
    address private wbtc;

    // price
    uint256 public cashPriceOne;
    uint256 public cashPriceCeiling;
    uint256 private bondDepletionFloor;
    uint256 private seigniorageSaved = 0;

    /* ========== CONSTRUCTOR ========== */

    constructor(
        address _cash,
        address _bond,
        address _share,
        address _cashOracle,
        address _wbtc,
        address _boardroom,
        uint256 _startTime
    ) public {
        cash = _cash;
        bond = _bond;
        share = _share;
        cashOracle = _cashOracle;
        boardroom = _boardroom;

        startTime = _startTime;

        cashPriceOne = 10**18;
        cashPriceCeiling = uint256(105).mul(cashPriceOne).div(10**2);

        bondDepletionFloor = uint256(1000).mul(cashPriceOne);
    }

    /* =================== Modifier =================== */

    modifier checkCondition {
        require(!migrated, 'ReserveBank: migrated');
        require(now >= startTime, 'Reserve Bank: not started yet');

        _;
    }

    modifier checkEpoch {
        require(now >= nextEpochPoint(), 'Reserve Bank: not opened yet');

        _;

        epoch = epoch.add(1);
    }

    modifier checkOperator {
        require(
            IBasisAsset(cash).operator() == address(this) &&
                IBasisAsset(bond).operator() == address(this) &&
                IBasisAsset(share).operator() == address(this) &&
                Operator(boardroom).operator() == address(this),
            'Reserve Bank: need more permission'
        );

        _;
    }

    modifier notInitialized {
        require(!initialized, 'Reserve Bank: already initialized');

        _;
    }

    /* ========== VIEW FUNCTIONS ========== */

    // flags
    function isMigrated() public view returns (bool) {
        return migrated;
    }

    function isInitialized() public view returns (bool) {
        return initialized;
    }

    // epoch
    function nextEpochPoint() public view returns (uint256) {
        return startTime.add(epoch.mul(PERIOD));
    }

    // oracle
    function getCashPrice() public view returns (uint256 cashPrice) {
        try IOracle(cashOracle).consult(cash, 1e18) returns (uint256 price) {
            return price;
        } catch {
            revert(
                'Reserve Bank: failed to consult cash price from the oracle'
            );
        }
    }

    function getBTDPrice(uint256 amount)
        public
        view
        returns (uint256 btdPrice)
    {
        try IOracle(cashOracle).consult(wbtc, amount) returns (
            uint256 wbtc2btdPrice
        ) {
            uint256 btd2daiPrice = getCashprice();

            return (wbtc2btdPrice / 1e18) * btd2daiPrice;
        } catch {
            revert(
                'Reserve Bank: failed to consult bitcoin dollar price from the oracle'
            );
        }
    }

    // budget
    function getReserve() public view returns (uint256) {
        return seigniorageSaved;
    }

    /* ========== GOVERNANCE ========== */

    function initialize() public notInitialized checkOperator {
        // burn all of it's balance
        IBasisAsset(cash).burn(IERC20(cash).balanceOf(address(this)));

        // mint only 1001 cash to itself
        IBasisAsset(cash).mint(address(this), 1001 ether);

        // set seigniorageSaved to it's balance
        seigniorageSaved = IERC20(cash).balanceOf(address(this));

        initialized = true;
        emit Initialized(msg.sender, block.number);
    }

    function migrate(address target) public onlyOperator checkOperator {
        require(!migrated, 'Reserve Bank: migrated');

        // cash
        Operator(cash).transferOperator(target);
        Operator(cash).transferOwnership(target);
        IERC20(cash).transfer(target, IERC20(cash).balanceOf(address(this)));

        // bond
        Operator(bond).transferOperator(target);
        Operator(bond).transferOwnership(target);
        IERC20(bond).transfer(target, IERC20(bond).balanceOf(address(this)));

        // share
        Operator(share).transferOperator(target);
        Operator(share).transferOwnership(target);
        IERC20(share).transfer(target, IERC20(share).balanceOf(address(this)));

        migrated = true;
        emit Migration(target);
    }

    /* ========== MUTABLE FUNCTIONS ========== */

    function _updateCashPrice() internal {
        try IOracle(cashOracle).update()  {} catch {}
    }

    function buyBonds(uint256 amount, uint256 targetPrice)
        external
        onlyOneBlock
        checkCondition
        checkOperator
    {
        require(
            amount > 0,
            'Reserve Bank: cannot purchase bonds with zero amount'
        );

        uint256 cashPrice = getCashPrice();
        require(cashPrice == targetPrice, 'Reserve Bank: cash price moved');
        require(
            cashPrice < cashPriceOne, // price < $1
            'Reserve Bank: cashPrice not eligible for bond purchase'
        );

        uint256 bondPrice = cashPrice;
        // TODO: Replace this logic with interest rate pool
        IBasisAsset(cash).burnFrom(msg.sender, amount);
        IBasisAsset(bond).mint(msg.sender, amount.mul(1e18).div(bondPrice));
        _updateCashPrice();

        emit BoughtBonds(msg.sender, amount);
    }

    function redeemBonds(uint256 amount, uint256 targetPrice)
        external
        onlyOneBlock
        checkCondition
        checkOperator
    {
        require(
            amount > 0,
            'Reserve Bank: cannot redeem bonds with zero amount'
        );

        uint256 cashPrice = getCashPrice();
        require(cashPrice == targetPrice, 'Reserve Bank: cash price moved');
        require(
            cashPrice > cashPriceCeiling, // price > $1.05
            'Reserve Bank: cashPrice not eligible for bond purchase'
        );
        require(
            IERC20(cash).balanceOf(address(this)) >= amount,
            'Reserve Bank: Reserve Bank has no more budget'
        );

        seigniorageSaved = seigniorageSaved.sub(
            Math.min(seigniorageSaved, amount)
        );

        // TODO: Replace this logic with intrest rate pool
        IBasisAsset(bond).burnFrom(msg.sender, amount);
        IERC20(cash).safeTransfer(msg.sender, amount);
        _updateCashPrice();

        emit RedeemedBonds(msg.sender, amount);
    }

    function issueBTD(uint256 amount) {
        require(
            IERC20(wbtc).transferFrom(msg.sender, address(this), amount),
            'Reserve Bank: Insufficient approval amount to proposed amount'
        );

        uint256 btd = getBTDPrice(amount);

        IERC20(cash).transfer(btd, msg.sender);

        emit DollarIssued(msg.sender, amount, btd);
    }

    function rebase()
        external
        onlyOneBlock
        checkCondition
        checkEpoch
        checkOperator
    {
        _updateCashPrice();
        uint256 cashPrice = getCashPrice();
        require(
            cashPrice > cashPriceCeiling,
            'Reserve Bank: there is no seigniorage to be allocated'
        );

        // TODO: get circulating supply difference from uniswap pair
        uint256 cashSupply = IERC20(cash).totalSupply().sub(seigniorageSaved);
        uint256 percentage = cashPrice.sub(cashPriceOne);
        uint256 seigniorage = cashSupply.mul(percentage).div(1e18);

        // Determine whether to issue a bond to reserve bank or distribute cash to seigniorage pool
        // Issue Cash
        if (seigniorageSaved > bondDepletionFloor) {
            IBasisAsset(cash).mint(address(this), seigniorage);
            IERC20(cash).safeApprove(boardroom, seigniorage);
            IBoardroom(boardroom).allocateSeigniorage(seigniorage);
            emit CongressFunded(now, seigniorage);
        } else {
            // Issue Bond
            seigniorageSaved = seigniorageSaved.add(seigniorage);
            IBasisAsset(cash).mint(address(this), seigniorage);
            emit Funded(now, seigniorage);
        }
    }

    event Initialized(address indexed executor, uint256 at);
    event Migration(address indexed target);
    event RedeemedBonds(address indexed from, uint256 amount);
    event BoughtBonds(address indexed from, uint256 amount);
    event Funded(uint256 timestamp, uint256 seigniorage);
    event DollarIssued(address indexed executor, uint256 input, uint256 output);
    event CongressFunded(uint256 timestamp, uint256 seigniorage);
}

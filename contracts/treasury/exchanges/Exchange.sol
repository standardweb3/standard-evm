
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/Math.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';

import '../../ownership/Operator.sol';
import '../../interfaces/IAggregator.sol';
import '../../utils/ContractGuard.sol';


/**
 * @title Standard Protocol Exchange contract
 * @notice Standard system exchange between digital assets and STC
 * @author Hyungsuk Kang(@hskang9)
 */
contract Exchange is ContractGuard, Operator {
    using SafeMath for uint256;
    event CashBought(address buyer, uint256 amount);
    event CollateralBought(address buyer, address collateral, uint256 amount);

    address collateral;
    address cash;
    address oracle;
     
    constructor(
        address collateral_,
        address cash_,
        address oracle_
    ) public {
        collateral = collateral_;
        cash = cash_;
        oracle = oracle_;
    }

    function buyCash(uint256 amount)
        external
        onlyOneBlock
    {
        require(amount > 0, 'Exchange: cannot purchase Cash with zero amount');

        // get 1 collateral -> STC rate
        uint256 rate = _getRate();

        bool collateralSent = IERC20(collateral).transferFrom(msg.sender, address(this), amount);
        require(collateralSent, 'Exchange: failed to transfer collateral from sender to exchange');

        // calculate cash amount form cashPrice regarding mantissas
        uint256 output = rate.mul(amount).div(1e8); // remove mantissas from the rate 

        bool cashSent = IERC20(cash).transfer(msg.sender, amount);
        require(cashSent, 'Exchange: failed to transfer collateral from sender to exchange');

        emit CashBought(msg.sender, output);
    }

    function buyCollateral(uint256 amount) 
        external
        onlyOneBlock
    {
        require(amount > 0, 'Exchange: cannot purchase Cash with zero amount');

        // get 1 collateral -> STC rate
        uint256 rate = _getRate();

        bool cashSent = IERC20(cash).transferFrom(msg.sender, address(this), amount);
        require(cashSent, 'Exchange: failed to transfer collateral from sender to exchange');

        // calculate cash amount form cashPrice regarding mantissas
        uint256 output = rate.div(amount).mul(1e8); // remove mantissas from the rate 

        bool collateralSent = IERC20(cash).transfer(msg.sender, amount);
        require(collateralSent, 'Exchange: failed to transfer collateral from sender to exchange');

        emit CollateralBought(msg.sender, collateral, output);
        
    }

    function _getRate() internal view returns (uint256) {
        try IAggregator(oracle).getLatestPrice() returns (uint256 rate) {
            return uint256(rate);
        } catch {
            revert('Exchange: failed to consult cash price from the oracle');
        }
    }
}
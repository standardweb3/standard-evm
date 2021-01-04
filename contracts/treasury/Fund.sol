

import '@openzeppelin/contracts/math/Math.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';

import '../ownership/Operator.sol';
import '../utils/ContractGuard.sol';


contract Fund is Operator {

    // TODO: add era lock for block epochs (approximately 90 days)
    function fundTo(address asset, address to, uint256 amount) public onlyOperator {
        IERC20(asset).transfer(to, amount);
    }
}
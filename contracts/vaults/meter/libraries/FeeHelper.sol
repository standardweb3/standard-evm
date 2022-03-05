// SPDX-License-Identifier: Apache-2.0

import "../interfaces/IVaultManager.sol";
import "./TransferHelper.sol";

library FeeHelper {
  function _sendFee(
    address manager,
    address asset_,
    uint256 amount_,
    uint256 fee_
  ) internal returns (uint256 left) {
    address dividend = IVaultManager(manager).dividend();
    address feeTo = IVaultManager(manager).feeTo();
    address treasury = IVaultManager(manager).treasury();
    bool feeOn = feeTo != address(0);
    bool treasuryOn = treasury != address(0);
    bool dividendOn = dividend != address(0);
    // send fee to the pool
    if (feeOn) {
      if (dividendOn && treasuryOn) {
        uint256 third = fee_ / 3;
        TransferHelper.safeTransfer(asset_, dividend, third);
        TransferHelper.safeTransfer(asset_, feeTo, third);
        TransferHelper.safeTransfer(asset_, treasury, third);
      } else if (dividendOn) {
        uint256 half = fee_ / 2;
        TransferHelper.safeTransfer(asset_, dividend, half);
        TransferHelper.safeTransfer(asset_, feeTo, half);
      } else {
        TransferHelper.safeTransfer(asset_, feeTo, fee_);
      }
    }
    return amount_ - fee_;
  }
}
// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "./libraries/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IERC20Minimal.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/ISupplyPool.sol";
import "./interfaces/IBondFactory.sol";

contract SupplyPool is AccessControl, ISupplyPool {
    using SafeMath for uint256;
    string public name;
    string public symbol;
    uint8 public constant decimals = 18;
    address private manager; // bond manager address
    address private factory; // bond factory address
    address private input;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH =
        0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
    mapping(address => uint256) public nonces;

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor() public {
        uint256 chainId;
        assembly {
            chainId := chainid()
        }
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes(name)),
                keccak256(bytes("1")),
                chainId,
                address(this)
            )
        );
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function initialize(address input_, address manager_, address factory_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "SupplyPool: Caller is not a minter");
        input = input_;
        manager = manager_;
        factory = factory_;
        string memory name_ = IERC20Minimal(input_).name();
        string memory symbol_ = IERC20Minimal(input_).symbol(); 
        string memory supplyName = string(abi.encodePacked("Standard", " ", "Supply", " ", name_));
        string memory supplySymbol = string(abi.encodePacked("ss",symbol_));
        name = supplyName;
        symbol = supplySymbol;
    }

    function _mint(address to, uint256 value) internal {
        totalSupply = totalSupply.add(value);
        balanceOf[to] = balanceOf[to].add(value);
        emit Transfer(address(0), to, value);
    }

    function _burn(address from, uint256 value) internal {
        balanceOf[from] = balanceOf[from].sub(value);
        totalSupply = totalSupply.sub(value);
        emit Transfer(from, address(0), value);
    }

    function _approve(
        address owner,
        address spender,
        uint256 value
    ) private {
        allowance[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    function _transfer(
        address from,
        address to,
        uint256 value
    ) private {
        balanceOf[from] = balanceOf[from].sub(value);
        balanceOf[to] = balanceOf[to].add(value);
        emit Transfer(from, to, value);
    }

    function approve(address spender, uint256 value) external returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function transfer(address to, uint256 value) external returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool) {
        if (allowance[from][msg.sender] != 2**256 - 1) {
            allowance[from][msg.sender] = allowance[from][msg.sender].sub(
                value
            );
        }
        _transfer(from, to, value);
        return true;
    }

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external override {
        require(deadline >= block.timestamp, "UniswapV2: EXPIRED");
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        PERMIT_TYPEHASH,
                        owner,
                        spender,
                        value,
                        nonces[owner]++,
                        deadline
                    )
                )
            )
        );
        address recoveredAddress = ecrecover(digest, v, r, s);
        require(
            recoveredAddress != address(0) && recoveredAddress == owner,
            "UniswapV2: INVALID_SIGNATURE"
        );
        _approve(owner, spender, value);
    }

    function enter(uint256 _amount) public {
        uint256 totalSTND = IERC20Minimal(input).balanceOf(address(this));
        uint256 totalShares = totalSupply;
        if (totalShares == 0 || totalSTND == 0) {
            _mint(msg.sender, _amount);
        } else {
            uint256 what = _amount.mul(totalShares).div(totalSTND);
            _mint(msg.sender, what);
        }
        TransferHelper.safeTransferFrom(input, msg.sender, address(this), _amount);
    }

    function leave(uint256 _share) public {
        uint256 totalShares = totalSupply;
        uint256 what = _share.mul(IERC20Minimal(input).balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        TransferHelper.safeTransfer(input, msg.sender, what);
    }

    function sendDebt(address borrower_, uint256 amount_) public override {
        require(msg.sender == manager, "SupplyPool: Caller is not the manager");
        TransferHelper.safeTransfer(input, borrower_, amount_);
    }

    function sendDebtFromBond(address factory_, uint256 bondId_, address to_, uint256 amount_) external override {
        require(factory == factory_, "IA"); // confirm bond factory contract is the known factory contract from the system, this prevents hackers making fake contracts that has the same interface
        require(IBondFactory(factory).getBond(bondId_)  == _msgSender(), "Meter: Not from Vault");
        TransferHelper.safeTransfer(input, to_, amount_);
    }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  BondedStrategy,
  BondedStrategyInterface,
} from "../BondedStrategy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "stnd_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DividendClaimed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "bond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "bonded",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stnd",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "unbond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "supply_",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "auto_",
        type: "bool",
      },
    ],
    name: "updateSupply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610c63380380610c6383398101604081905261002f91610054565b600180546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610bd0806100936000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80637173caba1161005b5780637173caba146100f357806396735aa0146101065780639940686e1461014b578063f19e2a211461015e57600080fd5b80631e83409a1461008257806327de9e321461009757806370a08231146100aa575b600080fd5b6100956100903660046109f7565b61017e565b005b6100956100a5366004610a51565b61061d565b6100e06100b83660046109f7565b73ffffffffffffffffffffffffffffffffffffffff1660009081526004602052604090205490565b6040519081526020015b60405180910390f35b610095610101366004610a83565b610768565b6001546101269073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100ea565b610095610159366004610a51565b61089c565b6100e061016c3660046109f7565b60046020526000908152604090205481565b3360009081526020819052604090205462278d009061019d9042610b43565b1015610230576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f4d6f6e746847756172643a2041206d6f6e746820686173206e6f74207061737360448201527f65642066726f6d20746865206c6173742072657175657374000000000000000060648201526084015b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561029857600080fd5b505afa1580156102ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d09190610a6a565b61035c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f466565506f6f6c3a2053544e4420686173206e6f74206265656e20706c61636560448201527f64207965740000000000000000000000000000000000000000000000000000006064820152608401610227565b600154604080517f18160ddd000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff16916318160ddd916004808301926020929190829003018186803b1580156103c757600080fd5b505afa1580156103db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ff9190610a6a565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8416906370a082319060240160206040518083038186803b15801561046457600080fd5b505afa158015610478573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061049c9190610a6a565b336000908152600460205260409020546104b69190610b06565b6104c09190610acb565b90506040517fa9059cbb0000000000000000000000000000000000000000000000000000000081523360048201526024810182905273ffffffffffffffffffffffffffffffffffffffff83169063a9059cbb90604401602060405180830381600087803b15801561053057600080fd5b505af1158015610544573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105689190610a34565b6105ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f466565506f6f6c3a20666565207472616e73666572206661696c6564000000006044820152606401610227565b60408051338152602081018390527f5efa67896a23b651b741b525caacba039c00ca7853be3de8eb1f4269e8669c56910160405180910390a15050336000908152602081905260409020429055565b33600090815260046020526040902054811115610696576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f466565506f6f6c3a204e6f7420656e6f75676820626f6e6465642053544e44006044820152606401610227565b6001546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081523360048201526024810183905273ffffffffffffffffffffffffffffffffffffffff9091169063a9059cbb90604401602060405180830381600087803b15801561070857600080fd5b505af115801561071c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107409190610a34565b503360009081526004602052604081208054839290610760908490610b43565b909155505050565b60035473ffffffffffffffffffffffffffffffffffffffff1633146107e9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f466565506f6f6c3a2041636365737320496e76616c69640000000000000000006044820152606401610227565b801561089657600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561085757600080fd5b505afa15801561086b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061088f9190610a6a565b6002555050565b50600255565b6001546040517f23b872dd0000000000000000000000000000000000000000000000000000000081523360048201523060248201526044810183905273ffffffffffffffffffffffffffffffffffffffff909116906323b872dd90606401602060405180830381600087803b15801561091457600080fd5b505af1158015610928573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061094c9190610a34565b6109d8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603760248201527f466565506f6f6c3a204e6f7420656e6f75676820616c6c6f77616e636520746f60448201527f206d6f7665207769746820676976656e20616d6f756e740000000000000000006064820152608401610227565b3360009081526004602052604081208054839290610760908490610ab3565b600060208284031215610a0957600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114610a2d57600080fd5b9392505050565b600060208284031215610a4657600080fd5b8151610a2d81610b89565b600060208284031215610a6357600080fd5b5035919050565b600060208284031215610a7c57600080fd5b5051919050565b60008060408385031215610a9657600080fd5b823591506020830135610aa881610b89565b809150509250929050565b60008219821115610ac657610ac6610b5a565b500190565b600082610b01577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610b3e57610b3e610b5a565b500290565b600082821015610b5557610b55610b5a565b500390565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8015158114610b9757600080fd5b5056fea26469706673582212203eda89ba490e31c78cdea26ce612cc4b733630df50a5e9756ef15ebfa27046f464736f6c63430008070033";

export class BondedStrategy__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    stnd_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BondedStrategy> {
    return super.deploy(stnd_, overrides || {}) as Promise<BondedStrategy>;
  }
  getDeployTransaction(
    stnd_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(stnd_, overrides || {});
  }
  attach(address: string): BondedStrategy {
    return super.attach(address) as BondedStrategy;
  }
  connect(signer: Signer): BondedStrategy__factory {
    return super.connect(signer) as BondedStrategy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BondedStrategyInterface {
    return new utils.Interface(_abi) as BondedStrategyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BondedStrategy {
    return new Contract(address, _abi, signerOrProvider) as BondedStrategy;
  }
}

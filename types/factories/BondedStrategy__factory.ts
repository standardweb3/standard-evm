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
      {
        internalType: "address",
        name: "meter_",
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
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mtr",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610ae5380380610ae583398101604081905261002f9161007c565b600180546001600160a01b039384166001600160a01b031991821617909155600280549290931691161790556100af565b80516001600160a01b038116811461007757600080fd5b919050565b6000806040838503121561008f57600080fd5b61009883610060565b91506100a660208401610060565b90509250929050565b610a27806100be6000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806396735aa01161005057806396735aa0146100de5780639940686e146100fe578063f19e2a211461011157600080fd5b806327de9e321461007757806330404bb11461008c5780634e71d92d146100d6575b600080fd5b61008a6100853660046108e9565b61013f565b005b6002546100ac9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b61008a61028f565b6001546100ac9073ffffffffffffffffffffffffffffffffffffffff1681565b61008a61010c3660046108e9565b61072f565b61013161011f36600461088a565b60036020526000908152604090205481565b6040519081526020016100cd565b336000908152600360205260409020548111156101bd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f466565506f6f6c3a204e6f7420656e6f75676820626f6e6465642053544e440060448201526064015b60405180910390fd5b6001546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081523360048201526024810183905273ffffffffffffffffffffffffffffffffffffffff9091169063a9059cbb90604401602060405180830381600087803b15801561022f57600080fd5b505af1158015610243573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061026791906108c7565b5033600090815260036020526040812080548392906102879084906109ab565b909155505050565b3360009081526020819052604090205462278d00906102ae90426109ab565b101561033c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f4d6f6e746847756172643a2041206d6f6e746820686173206e6f74207061737360448201527f65642066726f6d20746865206c6173742072657175657374000000000000000060648201526084016101b4565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156103a457600080fd5b505afa1580156103b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103dc9190610902565b610468576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f466565506f6f6c3a2053544e4420686173206e6f74206265656e20706c61636560448201527f642079657400000000000000000000000000000000000000000000000000000060648201526084016101b4565b600154604080517f18160ddd000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff16916318160ddd916004808301926020929190829003018186803b1580156104d357600080fd5b505afa1580156104e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061050b9190610902565b6002546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff909116906370a082319060240160206040518083038186803b15801561057457600080fd5b505afa158015610588573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ac9190610902565b336000908152600360205260409020546105c6919061096e565b6105d09190610933565b6002546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081523360048201526024810183905291925073ffffffffffffffffffffffffffffffffffffffff169063a9059cbb90604401602060405180830381600087803b15801561064357600080fd5b505af1158015610657573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067b91906108c7565b6106e1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f466565506f6f6c3a20666565207472616e73666572206661696c65640000000060448201526064016101b4565b60408051338152602081018390527f5efa67896a23b651b741b525caacba039c00ca7853be3de8eb1f4269e8669c56910160405180910390a150336000908152602081905260409020429055565b6001546040517f23b872dd0000000000000000000000000000000000000000000000000000000081523360048201523060248201526044810183905273ffffffffffffffffffffffffffffffffffffffff909116906323b872dd90606401602060405180830381600087803b1580156107a757600080fd5b505af11580156107bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107df91906108c7565b61086b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603760248201527f466565506f6f6c3a204e6f7420656e6f75676820616c6c6f77616e636520746f60448201527f206d6f7665207769746820676976656e20616d6f756e7400000000000000000060648201526084016101b4565b336000908152600360205260408120805483929061028790849061091b565b60006020828403121561089c57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146108c057600080fd5b9392505050565b6000602082840312156108d957600080fd5b815180151581146108c057600080fd5b6000602082840312156108fb57600080fd5b5035919050565b60006020828403121561091457600080fd5b5051919050565b6000821982111561092e5761092e6109c2565b500190565b600082610969577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156109a6576109a66109c2565b500290565b6000828210156109bd576109bd6109c2565b500390565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea264697066735822122041f27f8c838e801a4685dc1bb707e95739369643aa376b4d8e976ded160c665a64736f6c63430008070033";

export class BondedStrategy__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    stnd_: string,
    meter_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BondedStrategy> {
    return super.deploy(
      stnd_,
      meter_,
      overrides || {}
    ) as Promise<BondedStrategy>;
  }
  getDeployTransaction(
    stnd_: string,
    meter_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(stnd_, meter_, overrides || {});
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

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
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Bonded",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "UnBonded",
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
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "getLastClaimed",
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
        name: "",
        type: "address",
      },
    ],
    name: "lastBonded",
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
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastClaimed",
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
    inputs: [],
    name: "totalSupply",
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
    name: "unbond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610d60380380610d6083398101604081905261002f91610054565b600180546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610ccd806100936000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c8063799cb3b4116100765780639940686e1161005b5780639940686e146101fb578063a284ceea1461020e578063f19e2a211461022e57600080fd5b8063799cb3b41461017557806396735aa0146101b657600080fd5b80631e83409a116100a75780631e83409a1461010757806327de9e321461012a57806370a082311461013f57600080fd5b806305141cd0146100c357806318160ddd146100fe575b600080fd5b6100eb6100d1366004610b3a565b600060208181529281526040808220909352908152205481565b6040519081526020015b60405180910390f35b6100eb60025481565b61011a610115366004610b18565b61024e565b60405190151581526020016100f5565b61013d610138366004610b8f565b6106bd565b005b6100eb61014d366004610b18565b73ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b6100eb610183366004610b18565b3360009081526020818152604080832073ffffffffffffffffffffffffffffffffffffffff949094168352929052205490565b6001546101d69073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100f5565b61013d610209366004610b8f565b61092e565b6100eb61021c366004610b18565b60046020526000908152604090205481565b6100eb61023c366004610b18565b60036020526000908152604090205481565b3360009081526020818152604080832073ffffffffffffffffffffffffffffffffffffffff85168452909152812054829062278d009061028e9042610c51565b1015610321576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f4d6f6e746847756172643a2041206d6f6e746820686173206e6f74207061737360448201527f65642066726f6d20746865206c6173742072657175657374000000000000000060648201526084015b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561038957600080fd5b505afa15801561039d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103c19190610ba8565b61044d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f426f6e64656453747261746567793a2053544e4420686173206e6f742062656560448201527f6e20706c616365642079657400000000000000000000000000000000000000006064820152608401610318565b6002546040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000919073ffffffffffffffffffffffffffffffffffffffff8616906370a082319060240160206040518083038186803b1580156104b957600080fd5b505afa1580156104cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104f19190610ba8565b3360009081526003602052604090205461050b9190610c14565b6105159190610bd9565b90506040517fa9059cbb0000000000000000000000000000000000000000000000000000000081523360048201526024810182905273ffffffffffffffffffffffffffffffffffffffff85169063a9059cbb90604401602060405180830381600087803b15801561058557600080fd5b505af1158015610599573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105bd9190610b6d565b610649576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f426f6e64656453747261746567793a20666565207472616e736665722066616960448201527f6c656400000000000000000000000000000000000000000000000000000000006064820152608401610318565b60408051338152602081018390527f5efa67896a23b651b741b525caacba039c00ca7853be3de8eb1f4269e8669c56910160405180910390a1503360009081526020818152604080832073ffffffffffffffffffffffffffffffffffffffff94909416835292905220429055506001919050565b3360009081526003602052604090205481111561075c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f426f6e64656453747261746567793a204e6f7420656e6f75676820626f6e646560448201527f642053544e4400000000000000000000000000000000000000000000000000006064820152608401610318565b3360009081526004602052604090205462278d009061077b9042610c51565b1015610809576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603b60248201527f426f6e64656447756172643a2041206d6f6e746820686173206e6f742070617360448201527f7365642066726f6d20746865206c61737420626f6e64656420747800000000006064820152608401610318565b6001546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081523360048201526024810183905273ffffffffffffffffffffffffffffffffffffffff9091169063a9059cbb90604401602060405180830381600087803b15801561087b57600080fd5b505af115801561088f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108b39190610b6d565b5033600090815260036020526040812080548392906108d3908490610c51565b9250508190555080600260008282546108ec9190610c51565b909155505060408051338152602081018390527f87f24005eae1cc90754034c963de08ca37a6d731bbaced837511d8d13d2e064f91015b60405180910390a150565b6001546040517f23b872dd0000000000000000000000000000000000000000000000000000000081523360048201523060248201526044810183905273ffffffffffffffffffffffffffffffffffffffff909116906323b872dd90606401602060405180830381600087803b1580156109a657600080fd5b505af11580156109ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109de9190610b6d565b610a6a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f426f6e64656453747261746567793a204e6f7420656e6f75676820616c6c6f7760448201527f616e636520746f206d6f7665207769746820676976656e20616d6f756e7400006064820152608401610318565b3360009081526003602052604081208054839290610a89908490610bc1565b925050819055508060026000828254610aa29190610bc1565b909155505033600081815260046020908152604091829020429055815192835282018390527fd0a009034e24a39106653c4903cf28b1947b8a9964d03206648e0f0a5de74a469101610923565b803573ffffffffffffffffffffffffffffffffffffffff81168114610b1357600080fd5b919050565b600060208284031215610b2a57600080fd5b610b3382610aef565b9392505050565b60008060408385031215610b4d57600080fd5b610b5683610aef565b9150610b6460208401610aef565b90509250929050565b600060208284031215610b7f57600080fd5b81518015158114610b3357600080fd5b600060208284031215610ba157600080fd5b5035919050565b600060208284031215610bba57600080fd5b5051919050565b60008219821115610bd457610bd4610c68565b500190565b600082610c0f577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610c4c57610c4c610c68565b500290565b600082821015610c6357610c63610c68565b500390565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea264697066735822122087b18ee30d54820b917a0bce8daac67517ca9301bf27865b4ce791a4a1d3c95b64736f6c63430008070033";

export class BondedStrategy__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
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

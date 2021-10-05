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
  "0x608060405234801561001057600080fd5b50604051610eee380380610eee83398101604081905261002f91610054565b600180546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610e5b806100936000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c80637173caba116100815780639940686e1161005b5780639940686e14610219578063a284ceea1461022c578063f19e2a211461024c57600080fd5b80637173caba14610180578063799cb3b41461019357806396735aa0146101d457600080fd5b80631e83409a116100b25780631e83409a1461011257806327de9e321461013557806370a082311461014a57600080fd5b806305141cd0146100ce57806318160ddd14610109575b600080fd5b6100f66100dc366004610c8c565b600060208181529281526040808220909352908152205481565b6040519081526020015b60405180910390f35b6100f660025481565b610125610120366004610c6a565b61026c565b6040519015158152602001610100565b610148610143366004610cdc565b6106db565b005b6100f6610158366004610c6a565b73ffffffffffffffffffffffffffffffffffffffff1660009081526004602052604090205490565b61014861018e366004610d0e565b61094c565b6100f66101a1366004610c6a565b3360009081526020818152604080832073ffffffffffffffffffffffffffffffffffffffff949094168352929052205490565b6001546101f49073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610100565b610148610227366004610cdc565b610a80565b6100f661023a366004610c6a565b60056020526000908152604090205481565b6100f661025a366004610c6a565b60046020526000908152604090205481565b3360009081526020818152604080832073ffffffffffffffffffffffffffffffffffffffff85168452909152812054829062278d00906102ac9042610dce565b101561033f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f4d6f6e746847756172643a2041206d6f6e746820686173206e6f74207061737360448201527f65642066726f6d20746865206c6173742072657175657374000000000000000060648201526084015b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156103a757600080fd5b505afa1580156103bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103df9190610cf5565b61046b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f426f6e64656453747261746567793a2053544e4420686173206e6f742062656560448201527f6e20706c616365642079657400000000000000000000000000000000000000006064820152608401610336565b6002546040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000919073ffffffffffffffffffffffffffffffffffffffff8616906370a082319060240160206040518083038186803b1580156104d757600080fd5b505afa1580156104eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061050f9190610cf5565b336000908152600460205260409020546105299190610d91565b6105339190610d56565b90506040517fa9059cbb0000000000000000000000000000000000000000000000000000000081523360048201526024810182905273ffffffffffffffffffffffffffffffffffffffff85169063a9059cbb90604401602060405180830381600087803b1580156105a357600080fd5b505af11580156105b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105db9190610cbf565b610667576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f426f6e64656453747261746567793a20666565207472616e736665722066616960448201527f6c656400000000000000000000000000000000000000000000000000000000006064820152608401610336565b60408051338152602081018390527f5efa67896a23b651b741b525caacba039c00ca7853be3de8eb1f4269e8669c56910160405180910390a1503360009081526020818152604080832073ffffffffffffffffffffffffffffffffffffffff94909416835292905220429055506001919050565b3360009081526004602052604090205481111561077a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f426f6e64656453747261746567793a204e6f7420656e6f75676820626f6e646560448201527f642053544e4400000000000000000000000000000000000000000000000000006064820152608401610336565b3360009081526005602052604090205462278d00906107999042610dce565b1015610827576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603b60248201527f426f6e64656447756172643a2041206d6f6e746820686173206e6f742070617360448201527f7365642066726f6d20746865206c61737420626f6e64656420747800000000006064820152608401610336565b6001546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081523360048201526024810183905273ffffffffffffffffffffffffffffffffffffffff9091169063a9059cbb90604401602060405180830381600087803b15801561089957600080fd5b505af11580156108ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d19190610cbf565b5033600090815260046020526040812080548392906108f1908490610dce565b92505081905550806002600082825461090a9190610dce565b909155505060408051338152602081018390527f87f24005eae1cc90754034c963de08ca37a6d731bbaced837511d8d13d2e064f91015b60405180910390a150565b60035473ffffffffffffffffffffffffffffffffffffffff1633146109cd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f426f6e64656453747261746567793a2041636365737320496e76616c696400006044820152606401610336565b8015610a7a57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b158015610a3b57600080fd5b505afa158015610a4f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a739190610cf5565b6002555050565b50600255565b6001546040517f23b872dd0000000000000000000000000000000000000000000000000000000081523360048201523060248201526044810183905273ffffffffffffffffffffffffffffffffffffffff909116906323b872dd90606401602060405180830381600087803b158015610af857600080fd5b505af1158015610b0c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b309190610cbf565b610bbc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f426f6e64656453747261746567793a204e6f7420656e6f75676820616c6c6f7760448201527f616e636520746f206d6f7665207769746820676976656e20616d6f756e7400006064820152608401610336565b3360009081526004602052604081208054839290610bdb908490610d3e565b925050819055508060026000828254610bf49190610d3e565b909155505033600081815260056020908152604091829020429055815192835282018390527fd0a009034e24a39106653c4903cf28b1947b8a9964d03206648e0f0a5de74a469101610941565b803573ffffffffffffffffffffffffffffffffffffffff81168114610c6557600080fd5b919050565b600060208284031215610c7c57600080fd5b610c8582610c41565b9392505050565b60008060408385031215610c9f57600080fd5b610ca883610c41565b9150610cb660208401610c41565b90509250929050565b600060208284031215610cd157600080fd5b8151610c8581610e14565b600060208284031215610cee57600080fd5b5035919050565b600060208284031215610d0757600080fd5b5051919050565b60008060408385031215610d2157600080fd5b823591506020830135610d3381610e14565b809150509250929050565b60008219821115610d5157610d51610de5565b500190565b600082610d8c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610dc957610dc9610de5565b500290565b600082821015610de057610de0610de5565b500390565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8015158114610e2257600080fd5b5056fea2646970667358221220cccdbd7dc26b696660c48b3d4185a93bdd575e10cb7de7148f8ac902a121e56b64736f6c63430008070033";

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

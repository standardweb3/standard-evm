/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  UpgradableProxy,
  UpgradableProxyInterface,
} from "../UpgradableProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_proxyTo",
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
        name: "_new",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_old",
        type: "address",
      },
    ],
    name: "ProxyOwnerUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_new",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_old",
        type: "address",
      },
    ],
    name: "ProxyUpdated",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "IMPLEMENTATION_SLOT",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OWNER_SLOT",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
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
    name: "proxyOwner",
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
    name: "proxyType",
    outputs: [
      {
        internalType: "uint256",
        name: "proxyTypeId",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferProxyOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newProxyTo",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "updateAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newProxyTo",
        type: "address",
      },
    ],
    name: "updateImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610a85380380610a858339818101604052602081101561003357600080fd5b505161003e3361004d565b61004781610071565b50610095565b7f0f0d4781fe8ea21621f49819e2b0d607722e68c33c2475b7ee855a0654a469ec55565b7f6927e4b1773d25e0863355a4eee95ef7cbca4b8e46f7856b20e135c68862674155565b6109e1806100a46000396000f3fe60806040526004361061007f5760003560e01c80635c60da1b1161004e5780635c60da1b14610193578063963949a3146101a8578063d88ca2c8146101bd578063f1739cae14610280576100ce565b8063025313a2146100d9578063025b22bc14610117578063086fc0c7146101575780634555d5c91461017e576100ce565b366100ce576100cc61008f6102c0565b6000368080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506102e592505050565b005b6100cc61008f6102c0565b3480156100e557600080fd5b506100ee61030d565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561012357600080fd5b506100cc6004803603602081101561013a57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661031c565b34801561016357600080fd5b5061016c6104f4565b60408051918252519081900360200190f35b34801561018a57600080fd5b5061016c610518565b34801561019f57600080fd5b506100ee61051d565b3480156101b457600080fd5b5061016c610527565b6100cc600480360360408110156101d357600080fd5b73ffffffffffffffffffffffffffffffffffffffff823516919081019060408101602082013564010000000081111561020b57600080fd5b82018360208201111561021d57600080fd5b8035906020019184600183028401116401000000008311171561023f57600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061054b945050505050565b34801561028c57600080fd5b506100cc600480360360208110156102a357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610761565b7f6927e4b1773d25e0863355a4eee95ef7cbca4b8e46f7856b20e135c6886267415490565b600080825160208401856127105a03f43d604051816000823e828015610309578282f35b8282fd5b60006103176108e9565b905090565b336103256108e9565b73ffffffffffffffffffffffffffffffffffffffff16146103a757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e4f545f4f574e45520000000000000000000000000000000000000000000000604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff811661042957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f494e56414c49445f50524f58595f414444524553530000000000000000000000604482015290519081900360640190fd5b6104328161090e565b610487576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806109876025913960400191505060405180910390fd5b61048f6102c0565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167fd32d24edea94f55e932d9a008afc425a8561462d1b1f57bc6e508e9a6b9509e160405160405180910390a36104f18161093e565b50565b7f6927e4b1773d25e0863355a4eee95ef7cbca4b8e46f7856b20e135c68862674181565b600290565b60006103176102c0565b7f0f0d4781fe8ea21621f49819e2b0d607722e68c33c2475b7ee855a0654a469ec81565b336105546108e9565b73ffffffffffffffffffffffffffffffffffffffff16146105d657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e4f545f4f574e45520000000000000000000000000000000000000000000000604482015290519081900360640190fd5b6105df8261031c565b600060603073ffffffffffffffffffffffffffffffffffffffff1634846040518082805190602001908083835b6020831061064957805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0909201916020918201910161060c565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d80600081146106ab576040519150601f19603f3d011682016040523d82523d6000602084013e6106b0565b606091505b509150915081819061075a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561071f578181015183820152602001610707565b50505050905090810190601f16801561074c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5050505050565b3361076a6108e9565b73ffffffffffffffffffffffffffffffffffffffff16146107ec57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e4f545f4f574e45520000000000000000000000000000000000000000000000604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff811661086e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f5a45524f5f414444524553530000000000000000000000000000000000000000604482015290519081900360640190fd5b7fdbe5fd65bcdbae152f24ab660ea68e72b4d4705b57b16e0caae994e214680ee2816108986108e9565b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a16104f181610962565b7f0f0d4781fe8ea21621f49819e2b0d607722e68c33c2475b7ee855a0654a469ec5490565b600073ffffffffffffffffffffffffffffffffffffffff821661093357506000610939565b50803b15155b919050565b7f6927e4b1773d25e0863355a4eee95ef7cbca4b8e46f7856b20e135c68862674155565b7f0f0d4781fe8ea21621f49819e2b0d607722e68c33c2475b7ee855a0654a469ec5556fe44455354494e4154494f4e5f414444524553535f49535f4e4f545f415f434f4e5452414354a2646970667358221220fff0c3ca413b5f0350b2dfb2d0d27b37b6a8599603c2f0a0b76421baee2c0d4c64736f6c634300060c0033";

export class UpgradableProxy__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _proxyTo: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UpgradableProxy> {
    return super.deploy(_proxyTo, overrides || {}) as Promise<UpgradableProxy>;
  }
  getDeployTransaction(
    _proxyTo: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_proxyTo, overrides || {});
  }
  attach(address: string): UpgradableProxy {
    return super.attach(address) as UpgradableProxy;
  }
  connect(signer: Signer): UpgradableProxy__factory {
    return super.connect(signer) as UpgradableProxy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UpgradableProxyInterface {
    return new utils.Interface(_abi) as UpgradableProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UpgradableProxy {
    return new Contract(address, _abi, signerOrProvider) as UpgradableProxy;
  }
}

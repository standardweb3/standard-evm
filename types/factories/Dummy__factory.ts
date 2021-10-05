/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Dummy, DummyInterface } from "../Dummy";

const _abi = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "price_",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getThePrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "price_",
        type: "int256",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161011c38038061011c83398101604081905261002f91610049565b600055600180546001600160a01b03191633179055610062565b60006020828403121561005b57600080fd5b5051919050565b60ac806100706000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80638c3c9a55146037578063f7a3080614604c575b600080fd5b60005460405190815260200160405180910390f35b605c6057366004605e565b600055565b005b600060208284031215606f57600080fd5b503591905056fea2646970667358221220c98464e0887d5249b995c8c16910b2a82aa4aef673e8faadc5af8dce2b5b10f064736f6c63430008070033";

export class Dummy__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    price_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Dummy> {
    return super.deploy(price_, overrides || {}) as Promise<Dummy>;
  }
  getDeployTransaction(
    price_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(price_, overrides || {});
  }
  attach(address: string): Dummy {
    return super.attach(address) as Dummy;
  }
  connect(signer: Signer): Dummy__factory {
    return super.connect(signer) as Dummy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DummyInterface {
    return new utils.Interface(_abi) as DummyInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Dummy {
    return new Contract(address, _abi, signerOrProvider) as Dummy;
  }
}

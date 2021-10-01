/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  BaseBoringBatchable,
  BaseBoringBatchableInterface,
} from "../BaseBoringBatchable";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "calls",
        type: "bytes[]",
      },
      {
        internalType: "bool",
        name: "revertOnFail",
        type: "bool",
      },
    ],
    name: "batch",
    outputs: [
      {
        internalType: "bool[]",
        name: "successes",
        type: "bool[]",
      },
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061058e806100206000396000f3fe60806040526004361061001e5760003560e01c8063d2423b5114610023575b600080fd5b61003661003136600461026a565b61004d565b604051610044929190610401565b60405180910390f35b6060808367ffffffffffffffff8111801561006757600080fd5b50604051908082528060200260200182016040528015610091578160200160208202803683370190505b5091508367ffffffffffffffff811180156100ab57600080fd5b506040519080825280602002602001820160405280156100df57816020015b60608152602001906001900390816100ca5790505b50905060005b848110156101f95760006060308888858181106100fe57fe5b905060200281019061011091906104b5565b60405161011e9291906103f1565b600060405180830381855af49150503d8060008114610159576040519150601f19603f3d011682016040523d82523d6000602084013e61015e565b606091505b5091509150818061016d575085155b61017682610202565b906101b7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ae919061049b565b60405180910390fd5b50818584815181106101c557fe5b602002602001019015159081151581525050808484815181106101e457fe5b602090810291909101015250506001016100e5565b50935093915050565b6060604482511015610248575060408051808201909152601d81527f5472616e73616374696f6e2072657665727465642073696c656e746c790000006020820152610265565b6004820191508180602001905181019061026291906102ee565b90505b919050565b60008060006040848603121561027e578283fd5b833567ffffffffffffffff80821115610295578485fd5b818601915086601f8301126102a8578485fd5b8135818111156102b6578586fd5b87602080830285010111156102c9578586fd5b6020928301955093505084013580151581146102e3578182fd5b809150509250925092565b6000602082840312156102ff578081fd5b815167ffffffffffffffff80821115610316578283fd5b818401915084601f830112610329578283fd5b815181811115610337578384fd5b60405160207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8401168201018181108482111715610375578586fd5b60405281815283820160200187101561038c578485fd5b61039d826020830160208701610528565b9695505050505050565b600081518084526103bf816020860160208601610528565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6000828483379101908152919050565b604080825283519082018190526000906020906060840190828701845b8281101561043c57815115158452928401929084019060010161041e565b50505083810382850152808551610453818461051f565b91508192508381028201848801865b8381101561048c57858303855261047a8383516103a7565b94870194925090860190600101610462565b50909998505050505050505050565b6000602082526104ae60208301846103a7565b9392505050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181126104e9578283fd5b83018035915067ffffffffffffffff821115610503578283fd5b60200191503681900382131561051857600080fd5b9250929050565b90815260200190565b60005b8381101561054357818101518382015260200161052b565b83811115610552576000848401525b5050505056fea2646970667358221220ca551c16df5d5abc535c7c5184a72503a00ec01d97dc14e8c98680f83655a7d764736f6c634300060c0033";

export class BaseBoringBatchable__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BaseBoringBatchable> {
    return super.deploy(overrides || {}) as Promise<BaseBoringBatchable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BaseBoringBatchable {
    return super.attach(address) as BaseBoringBatchable;
  }
  connect(signer: Signer): BaseBoringBatchable__factory {
    return super.connect(signer) as BaseBoringBatchable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BaseBoringBatchableInterface {
    return new utils.Interface(_abi) as BaseBoringBatchableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BaseBoringBatchable {
    return new Contract(address, _abi, signerOrProvider) as BaseBoringBatchable;
  }
}

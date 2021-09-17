/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  UsingLiquidityProtectionService,
  UsingLiquidityProtectionServiceInterface,
} from "../UsingLiquidityProtectionService";

const _abi = [
  {
    inputs: [],
    name: "disableProtection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isProtected",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_holders",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_revokeTo",
        type: "address",
      },
    ],
    name: "revokeBlocked",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class UsingLiquidityProtectionService__factory {
  static readonly abi = _abi;
  static createInterface(): UsingLiquidityProtectionServiceInterface {
    return new utils.Interface(
      _abi
    ) as UsingLiquidityProtectionServiceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UsingLiquidityProtectionService {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as UsingLiquidityProtectionService;
  }
}
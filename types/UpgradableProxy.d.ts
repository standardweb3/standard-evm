/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface UpgradableProxyInterface extends ethers.utils.Interface {
  functions: {
    "IMPLEMENTATION_SLOT()": FunctionFragment;
    "OWNER_SLOT()": FunctionFragment;
    "implementation()": FunctionFragment;
    "proxyOwner()": FunctionFragment;
    "proxyType()": FunctionFragment;
    "transferProxyOwnership(address)": FunctionFragment;
    "updateAndCall(address,bytes)": FunctionFragment;
    "updateImplementation(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "IMPLEMENTATION_SLOT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "OWNER_SLOT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "implementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proxyOwner",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "proxyType", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferProxyOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateAndCall",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateImplementation",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "IMPLEMENTATION_SLOT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "OWNER_SLOT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "implementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "proxyOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proxyType", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferProxyOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateImplementation",
    data: BytesLike
  ): Result;

  events: {
    "ProxyOwnerUpdate(address,address)": EventFragment;
    "ProxyUpdated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ProxyOwnerUpdate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProxyUpdated"): EventFragment;
}

export type ProxyOwnerUpdateEvent = TypedEvent<
  [string, string] & { _new: string; _old: string }
>;

export type ProxyUpdatedEvent = TypedEvent<
  [string, string] & { _new: string; _old: string }
>;

export class UpgradableProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: UpgradableProxyInterface;

  functions: {
    IMPLEMENTATION_SLOT(overrides?: CallOverrides): Promise<[string]>;

    OWNER_SLOT(overrides?: CallOverrides): Promise<[string]>;

    implementation(overrides?: CallOverrides): Promise<[string]>;

    proxyOwner(overrides?: CallOverrides): Promise<[string]>;

    proxyType(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { proxyTypeId: BigNumber }>;

    transferProxyOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateAndCall(
      _newProxyTo: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateImplementation(
      _newProxyTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  IMPLEMENTATION_SLOT(overrides?: CallOverrides): Promise<string>;

  OWNER_SLOT(overrides?: CallOverrides): Promise<string>;

  implementation(overrides?: CallOverrides): Promise<string>;

  proxyOwner(overrides?: CallOverrides): Promise<string>;

  proxyType(overrides?: CallOverrides): Promise<BigNumber>;

  transferProxyOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateAndCall(
    _newProxyTo: string,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateImplementation(
    _newProxyTo: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    IMPLEMENTATION_SLOT(overrides?: CallOverrides): Promise<string>;

    OWNER_SLOT(overrides?: CallOverrides): Promise<string>;

    implementation(overrides?: CallOverrides): Promise<string>;

    proxyOwner(overrides?: CallOverrides): Promise<string>;

    proxyType(overrides?: CallOverrides): Promise<BigNumber>;

    transferProxyOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateAndCall(
      _newProxyTo: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    updateImplementation(
      _newProxyTo: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ProxyOwnerUpdate(address,address)"(
      _new?: null,
      _old?: null
    ): TypedEventFilter<[string, string], { _new: string; _old: string }>;

    ProxyOwnerUpdate(
      _new?: null,
      _old?: null
    ): TypedEventFilter<[string, string], { _new: string; _old: string }>;

    "ProxyUpdated(address,address)"(
      _new?: string | null,
      _old?: string | null
    ): TypedEventFilter<[string, string], { _new: string; _old: string }>;

    ProxyUpdated(
      _new?: string | null,
      _old?: string | null
    ): TypedEventFilter<[string, string], { _new: string; _old: string }>;
  };

  estimateGas: {
    IMPLEMENTATION_SLOT(overrides?: CallOverrides): Promise<BigNumber>;

    OWNER_SLOT(overrides?: CallOverrides): Promise<BigNumber>;

    implementation(overrides?: CallOverrides): Promise<BigNumber>;

    proxyOwner(overrides?: CallOverrides): Promise<BigNumber>;

    proxyType(overrides?: CallOverrides): Promise<BigNumber>;

    transferProxyOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateAndCall(
      _newProxyTo: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateImplementation(
      _newProxyTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    IMPLEMENTATION_SLOT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    OWNER_SLOT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    implementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proxyOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proxyType(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferProxyOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateAndCall(
      _newProxyTo: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateImplementation(
      _newProxyTo: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MeterToken, MeterTokenInterface } from "../MeterToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "manager",
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
        name: "_user",
        type: "address",
      },
    ],
    name: "AddedBlackList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_blackListedUser",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_balance",
        type: "uint256",
      },
    ],
    name: "DestroyedBlackFunds",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "RemovedBlackList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "BURNER_ROLE",
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
    name: "DEFAULT_ADMIN_ROLE",
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
    name: "MINTER_ROLE",
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
    name: "PAUSER_ROLE",
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
    inputs: [
      {
        internalType: "address",
        name: "_evilUser",
        type: "address",
      },
    ],
    name: "addBlackList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "_blackListedUser",
        type: "address",
      },
    ],
    name: "destroyBlackFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_maker",
        type: "address",
      },
    ],
    name: "getBlackListStatus",
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
    inputs: [],
    name: "getOwner",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "",
        type: "address",
      },
    ],
    name: "isBlackListed",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
        internalType: "address",
        name: "_clearedUser",
        type: "address",
      },
    ],
    name: "removeBlackList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "manager_",
        type: "address",
      },
    ],
    name: "setManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002bb938038062002bb9833981016040819052620000349162000352565b82826200004133620000f1565b815162000056906004906020850190620001f5565b5080516200006c906005906020840190620001f5565b50506006805460ff19169055506200008660003362000141565b620000a160008051602062002b998339815191523362000141565b620000cd7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a3362000141565b620000e860008051602062002b998339815191528262000141565b50505062000432565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6200014d828262000151565b5050565b60008281526008602090815260408083206001600160a01b038516845290915290205460ff166200014d5760008281526008602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620001b13390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b8280546200020390620003df565b90600052602060002090601f01602090048101928262000227576000855562000272565b82601f106200024257805160ff191683800117855562000272565b8280016001018555821562000272579182015b828111156200027257825182559160200191906001019062000255565b506200028092915062000284565b5090565b5b8082111562000280576000815560010162000285565b600082601f830112620002ad57600080fd5b81516001600160401b0380821115620002ca57620002ca6200041c565b604051601f8301601f19908116603f01168101908282118183101715620002f557620002f56200041c565b816040528381526020925086838588010111156200031257600080fd5b600091505b8382101562000336578582018301518183018401529082019062000317565b83821115620003485760008385830101525b9695505050505050565b6000806000606084860312156200036857600080fd5b83516001600160401b03808211156200038057600080fd5b6200038e878388016200029b565b94506020860151915080821115620003a557600080fd5b50620003b4868287016200029b565b604086015190935090506001600160a01b0381168114620003d457600080fd5b809150509250925092565b600181811c90821680620003f457607f821691505b602082108114156200041657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b61275780620004426000396000f3fe608060405234801561001057600080fd5b50600436106102775760003560e01c8063715018a611610160578063a9059cbb116100d8578063e47d60601161008c578063e63ab1e911610071578063e63ab1e914610605578063f2fde38b1461062c578063f3bdc2281461063f57600080fd5b8063e47d6060146105cf578063e4997dc5146105f257600080fd5b8063d5391393116100bd578063d53913931461054f578063d547741f14610576578063dd62ed3e1461058957600080fd5b8063a9059cbb14610529578063d0ebdbe71461053c57600080fd5b80638da5cb5b1161012f57806395d89b411161011457806395d89b4114610506578063a217fddf1461050e578063a457c2d71461051657600080fd5b80638da5cb5b146104a257806391d14854146104c057600080fd5b8063715018a61461044057806379cc6790146104485780638456cb591461045b578063893d20e81461046357600080fd5b8063313ce567116101f357806340c10f19116101c257806359bf1abe116101a757806359bf1abe146103c65780635c975abb146103ff57806370a082311461040a57600080fd5b806340c10f19146103a057806342966c68146103b357600080fd5b8063313ce5671461036357806336568abe1461037257806339509351146103855780633f4ba83a1461039857600080fd5b806318160ddd1161024a578063248a9ca31161022f578063248a9ca314610306578063282c51f3146103295780632f2ff15d1461035057600080fd5b806318160ddd146102e157806323b872dd146102f357600080fd5b806301ffc9a71461027c57806306fdde03146102a4578063095ea7b3146102b95780630ecb93c0146102cc575b600080fd5b61028f61028a36600461245f565b610652565b60405190151581526020015b60405180910390f35b6102ac6106eb565b60405161029b9190612522565b61028f6102c73660046123f9565b61077d565b6102df6102da36600461236f565b610793565b005b6003545b60405190815260200161029b565b61028f6103013660046123bd565b61089f565b6102e5610314366004612423565b60009081526008602052604090206001015490565b6102e57f3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a84881565b6102df61035e36600461243c565b610985565b6040516012815260200161029b565b6102df61038036600461243c565b6109b0565b61028f6103933660046123f9565b610a63565b6102df610aac565b6102df6103ae3660046123f9565b610b6c565b6102df6103c1366004612423565b610c0e565b61028f6103d436600461236f565b73ffffffffffffffffffffffffffffffffffffffff1660009081526007602052604090205460ff1690565b60065460ff1661028f565b6102e561041836600461236f565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604090205490565b6102df610cd0565b6102df6104563660046123f9565b610d5b565b6102df610e11565b60005473ffffffffffffffffffffffffffffffffffffffff165b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161029b565b60005473ffffffffffffffffffffffffffffffffffffffff1661047d565b61028f6104ce36600461243c565b600091825260086020908152604080842073ffffffffffffffffffffffffffffffffffffffff93909316845291905290205460ff1690565b6102ac610ecf565b6102e5600081565b61028f6105243660046123f9565b610ede565b61028f6105373660046123f9565b610fb6565b6102df61054a36600461236f565b610fc3565b6102e57f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6102df61058436600461243c565b6110aa565b6102e561059736600461238a565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260026020908152604080832093909416825291909152205490565b61028f6105dd36600461236f565b60076020526000908152604090205460ff1681565b6102df61060036600461236f565b6110d0565b6102e57f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6102df61063a36600461236f565b6111cd565b6102df61064d36600461236f565b6112fa565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b0000000000000000000000000000000000000000000000000000000014806106e557507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6060600480546106fa90612640565b80601f016020809104026020016040519081016040528092919081815260200182805461072690612640565b80156107735780601f1061074857610100808354040283529160200191610773565b820191906000526020600020905b81548152906001019060200180831161075657829003601f168201915b5050505050905090565b600061078a338484611430565b50600192915050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610819576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff811660008181526007602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905590519182527f42e160154868087d6bfdc0ca23d96a1c1cfa32f1b72ba9ba27b69b98a0d819dc91015b60405180910390a150565b60006108ac8484846115e3565b73ffffffffffffffffffffffffffffffffffffffff841660009081526002602090815260408083203384529091529020548281101561096d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e63650000000000000000000000000000000000000000000000006064820152608401610810565b61097a8533858403611430565b506001949350505050565b6000828152600860205260409020600101546109a181336118a3565b6109ab8383611975565b505050565b73ffffffffffffffffffffffffffffffffffffffff81163314610a55576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c6600000000000000000000000000000000006064820152608401610810565b610a5f8282611a69565b5050565b33600081815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168452909152812054909161078a918590610aa7908690612573565b611430565b610ad67f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a336104ce565b610b62576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f4d657465723a206d75737420686176652070617573657220726f6c6520746f2060448201527f756e7061757365000000000000000000000000000000000000000000000000006064820152608401610810565b610b6a611b24565b565b3360009081527f51a495916474fe1a0c0fcfb65a8a97682b84a054118858cdd1f5dfd7fc0919eb602052604090205460ff16610c04576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f4d657465723a2043616c6c6572206973206e6f742061206d696e7465720000006044820152606401610810565b610a5f8282611c05565b610c387f3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a848336104ce565b610cc3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4d657465723a206d7573742068617665206275726e657220726f6c6520746f2060448201527f6275726e000000000000000000000000000000000000000000000000000000006064820152608401610810565b610ccd3382611d31565b50565b60005473ffffffffffffffffffffffffffffffffffffffff163314610d51576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610810565b610b6a6000611f2a565b6000610d678333610597565b905081811015610df8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f7760448201527f616e6365000000000000000000000000000000000000000000000000000000006064820152608401610810565b610e078333610aa785856125c8565b6109ab8383611d31565b610e3b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a336104ce565b610ec7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4d657465723a206d75737420686176652070617573657220726f6c6520746f2060448201527f70617573650000000000000000000000000000000000000000000000000000006064820152608401610810565b610b6a611f9f565b6060600580546106fa90612640565b33600090815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff8616845290915281205482811015610f9f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610810565b610fac3385858403611430565b5060019392505050565b600061078a3384846115e3565b3360009081527f5eff886ea0ce6ca488a3d6e336d6c0f75f46d19b42c06ce5ee98e42c96d256c7602052604090205460ff16611080576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f4d545256313a2043616c6c6572206973206e6f7420612064656661756c74206160448201527f646d696e000000000000000000000000000000000000000000000000000000006064820152608401610810565b610ccd7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a68261205f565b6000828152600860205260409020600101546110c681336118a3565b6109ab8383611a69565b60005473ffffffffffffffffffffffffffffffffffffffff163314611151576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610810565b73ffffffffffffffffffffffffffffffffffffffff811660008181526007602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905590519182527fd7e9ec6e6ecd65492dce6bf513cd6867560d49544421d0783ddf06e76c24470c9101610894565b60005473ffffffffffffffffffffffffffffffffffffffff16331461124e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610810565b73ffffffffffffffffffffffffffffffffffffffff81166112f1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610810565b610ccd81611f2a565b60005473ffffffffffffffffffffffffffffffffffffffff16331461137b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610810565b73ffffffffffffffffffffffffffffffffffffffff811660009081526007602052604090205460ff166113ad57600080fd5b73ffffffffffffffffffffffffffffffffffffffff81166000908152600160205260409020546113dd8282611d31565b6040805173ffffffffffffffffffffffffffffffffffffffff84168152602081018390527f61e6e66b0d6339b2980aecc6ccc0039736791f0ccde9ed512e789a7fbdd698c6910160405180910390a15050565b73ffffffffffffffffffffffffffffffffffffffff83166114d2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610810565b73ffffffffffffffffffffffffffffffffffffffff8216611575576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152608401610810565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316611686576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610810565b73ffffffffffffffffffffffffffffffffffffffff8216611729576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610810565b611734838383612069565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260016020526040902054818110156117ea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610810565b73ffffffffffffffffffffffffffffffffffffffff80851660009081526001602052604080822085850390559185168152908120805484929061182e908490612573565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161189491815260200190565b60405180910390a35b50505050565b600082815260086020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff16610a5f576118fb8173ffffffffffffffffffffffffffffffffffffffff1660146120fc565b6119068360206120fc565b6040516020016119179291906124a1565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290527f08c379a000000000000000000000000000000000000000000000000000000000825261081091600401612522565b600082815260086020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff16610a5f57600082815260086020908152604080832073ffffffffffffffffffffffffffffffffffffffff85168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055611a0b3390565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260086020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff1615610a5f57600082815260086020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516808552925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60065460ff16611b90576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f5061757361626c653a206e6f74207061757365640000000000000000000000006044820152606401610810565b600680547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390a1565b73ffffffffffffffffffffffffffffffffffffffff8216611c82576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610810565b611c8e60008383612069565b8060036000828254611ca09190612573565b909155505073ffffffffffffffffffffffffffffffffffffffff821660009081526001602052604081208054839290611cda908490612573565b909155505060405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b73ffffffffffffffffffffffffffffffffffffffff8216611dd4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610810565b611de082600083612069565b73ffffffffffffffffffffffffffffffffffffffff821660009081526001602052604090205481811015611e96576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f63650000000000000000000000000000000000000000000000000000000000006064820152608401610810565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600160205260408120838303905560038054849290611ed29084906125c8565b909155505060405182815260009073ffffffffffffffffffffffffffffffffffffffff8516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b6000805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60065460ff161561200c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a20706175736564000000000000000000000000000000006044820152606401610810565b600680547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611bdb3390565b610a5f8282611975565b60065460ff16156109ab576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f45524332305061757361626c653a20746f6b656e207472616e7366657220776860448201527f696c6520706175736564000000000000000000000000000000000000000000006064820152608401610810565b6060600061210b83600261258b565b612116906002612573565b67ffffffffffffffff81111561212e5761212e6126f2565b6040519080825280601f01601f191660200182016040528015612158576020820181803683370190505b5090507f30000000000000000000000000000000000000000000000000000000000000008160008151811061218f5761218f6126c3565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106121f2576121f26126c3565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600061222e84600261258b565b612239906001612573565b90505b60018111156122d6577f303132333435363738396162636465660000000000000000000000000000000085600f166010811061227a5761227a6126c3565b1a60f81b828281518110612290576122906126c3565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060049490941c936122cf8161260b565b905061223c565b50831561233f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610810565b9392505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461236a57600080fd5b919050565b60006020828403121561238157600080fd5b61233f82612346565b6000806040838503121561239d57600080fd5b6123a683612346565b91506123b460208401612346565b90509250929050565b6000806000606084860312156123d257600080fd5b6123db84612346565b92506123e960208501612346565b9150604084013590509250925092565b6000806040838503121561240c57600080fd5b61241583612346565b946020939093013593505050565b60006020828403121561243557600080fd5b5035919050565b6000806040838503121561244f57600080fd5b823591506123b460208401612346565b60006020828403121561247157600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461233f57600080fd5b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516124d98160178501602088016125df565b7f206973206d697373696e6720726f6c652000000000000000000000000000000060179184019182015283516125168160288401602088016125df565b01602801949350505050565b60208152600082518060208401526125418160408501602087016125df565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b6000821982111561258657612586612694565b500190565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156125c3576125c3612694565b500290565b6000828210156125da576125da612694565b500390565b60005b838110156125fa5781810151838201526020016125e2565b8381111561189d5750506000910152565b60008161261a5761261a612694565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b600181811c9082168061265457607f821691505b6020821081141561268e577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fdfea2646970667358221220f2581cb04a5e6f274b86ae0b4f343e88d9abe14888141ef1e9bc37a3db473fe964736f6c634300080700339f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";

export class MeterToken__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name: string,
    symbol: string,
    manager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MeterToken> {
    return super.deploy(
      name,
      symbol,
      manager,
      overrides || {}
    ) as Promise<MeterToken>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    manager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, manager, overrides || {});
  }
  attach(address: string): MeterToken {
    return super.attach(address) as MeterToken;
  }
  connect(signer: Signer): MeterToken__factory {
    return super.connect(signer) as MeterToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MeterTokenInterface {
    return new utils.Interface(_abi) as MeterTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MeterToken {
    return new Contract(address, _abi, signerOrProvider) as MeterToken;
  }
}

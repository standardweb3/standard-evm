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
        internalType: "address",
        name: "claimingWith",
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
    inputs: [],
    name: "ADMIN_ROLE",
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
    name: "BOND_ROLE",
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
    name: "CLAIM_ROLE",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "_durations",
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
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastTx",
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
        internalType: "bytes32",
        name: "_role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "setDuration",
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
  "0x60806040523480156200001157600080fd5b5060405162001bf538038062001bf5833981016040819052620000349162000236565b62000041600033620000f1565b6200006d7fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c2177533620000f1565b6200009c7fc7975a12e44269ae9807788974b5f14480a3f5a459d7dafacd00b9e5f11db7d86212750062000101565b620000cb7ff7db13299c8a9e501861f04c20f69a2444829a36a363cfad4b58864709c755606212750062000101565b600380546001600160a01b0319166001600160a01b039290921691909117905562000268565b620000fd828262000196565b5050565b3360009081527f7d7ffb7a348e1c6a02869081a26547b49160dd3df72d1d75a570eb9b698292ec602052604090205460ff16620001845760405162461bcd60e51b815260206004820152601d60248201527f4475726174696f6e47756172643a2041434345535320494e56414c4944000000604482015260640160405180910390fd5b60009182526002602052604090912055565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16620000fd576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620001f23390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000602082840312156200024957600080fd5b81516001600160a01b03811681146200026157600080fd5b9392505050565b61197d80620002786000396000f3fe608060405234801561001057600080fd5b506004361061016c5760003560e01c80637ee0e91b116100cd578063a217fddf11610081578063d547741f11610066578063d547741f146103c8578063e2a8ade7146103db578063f19e2a21146103ee57600080fd5b8063a217fddf14610395578063d0a516361461039d57600080fd5b806391d14854116100b257806391d14854146102f957806396735aa01461033d5780639940686e1461038257600080fd5b80637ee0e91b146102b257806386c1b4eb146102d257600080fd5b80632f2ff15d1161012457806336568abe1161010957806336568abe1461023557806375b238fc14610248578063799cb3b41461026f57600080fd5b80632f2ff15d146101fb578063342247ab1461020e57600080fd5b80631e83409a116101555780631e83409a146101b0578063248a9ca3146101c357806327de9e32146101e657600080fd5b806301ffc9a71461017157806318160ddd14610199575b600080fd5b61018461017f366004611681565b61040e565b60405190151581526020015b60405180910390f35b6101a260045481565b604051908152602001610190565b6101846101be3660046115b3565b6104a7565b6101a26101d1366004611623565b60009081526020819052604090206001015490565b6101f96101f4366004611623565b610941565b005b6101f961020936600461163c565b610d3b565b6101a27fc7975a12e44269ae9807788974b5f14480a3f5a459d7dafacd00b9e5f11db7d881565b6101f961024336600461163c565b610d66565b6101a27fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c2177581565b6101a261027d3660046115b3565b33600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff949094168352929052205490565b6101a26102c0366004611623565b60026020526000908152604090205481565b6101a27ff7db13299c8a9e501861f04c20f69a2444829a36a363cfad4b58864709c7556081565b61018461030736600461163c565b60009182526020828152604080842073ffffffffffffffffffffffffffffffffffffffff93909316845291905290205460ff1690565b60035461035d9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610190565b6101f9610390366004611623565b610e19565b6101a2600081565b6101a26103ab3660046115ce565b600160209081526000928352604080842090915290825290205481565b6101f96103d636600461163c565b611001565b6101f96103e936600461165f565b611027565b6101a26103fc3660046115b3565b60056020526000908152604090205481565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b0000000000000000000000000000000000000000000000000000000014806104a157507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b7f92620ac69ef6cc6db422ddd207a0b7de05ceed18a0ec4c86f8143c2f9fc8d8735433600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8616845290915281205490917ff7db13299c8a9e501861f04c20f69a2444829a36a363cfad4b58864709c755609184919061052b904261183e565b10156105be576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f4475726174696f6e47756172643a2041206475726174696f6e20686173206e6f60448201527f74207061737365642066726f6d20746865206c6173742072657175657374000060648201526084015b60405180910390fd5b60035473ffffffffffffffffffffffffffffffffffffffff85811691161415610643576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f426f6e64656453747261746567793a20496e76616c696420436c61696d00000060448201526064016105b5565b7f92620ac69ef6cc6db422ddd207a0b7de05ceed18a0ec4c86f8143c2f9fc8d8735433600090815260016020908152604080832060035473ffffffffffffffffffffffffffffffffffffffff1684529091529020546106a2904261183e565b10156106ad57600080fd5b600480546040517f70a08231000000000000000000000000000000000000000000000000000000008152309281019290925260009173ffffffffffffffffffffffffffffffffffffffff8716906370a082319060240160206040518083038186803b15801561071b57600080fd5b505afa15801561072f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075391906116c3565b3360009081526005602052604090205461076d9190611801565b61077791906117c6565b6040517fa9059cbb0000000000000000000000000000000000000000000000000000000081523360048201526024810182905290915073ffffffffffffffffffffffffffffffffffffffff86169063a9059cbb90604401602060405180830381600087803b1580156107e857600080fd5b505af11580156107fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108209190611601565b6108ac576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f426f6e64656453747261746567793a20666565207472616e736665722066616960448201527f6c6564000000000000000000000000000000000000000000000000000000000060648201526084016105b5565b6040805133815273ffffffffffffffffffffffffffffffffffffffff871660208201529081018290527ff672323216d71b2d59f826d5cc49657006c38667b59ae06ec262b9f71bed64fb9060600160405180910390a1600193505033600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff9490941683529290522042905550919050565b6003547ffeee0bac2511f6c7639ba22d4e0dc9273307bebdc5af8db7b9bbecbfcb1679165433600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff909516808452949091529020547fc7975a12e44269ae9807788974b5f14480a3f5a459d7dafacd00b9e5f11db7d89291906109c8904261183e565b1015610a56576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f4475726174696f6e47756172643a2041206475726174696f6e20686173206e6f60448201527f74207061737365642066726f6d20746865206c6173742072657175657374000060648201526084016105b5565b33600090815260056020526040902054831115610af5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f426f6e64656453747261746567793a204e6f7420656e6f75676820626f6e646560448201527f642053544e44000000000000000000000000000000000000000000000000000060648201526084016105b5565b7ffeee0bac2511f6c7639ba22d4e0dc9273307bebdc5af8db7b9bbecbfcb1679165433600090815260016020908152604080832060035473ffffffffffffffffffffffffffffffffffffffff168452909152902054610b54904261183e565b1015610be2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603b60248201527f426f6e64656447756172643a2041206d6f6e746820686173206e6f742070617360448201527f7365642066726f6d20746865206c61737420626f6e646564207478000000000060648201526084016105b5565b3360009081526005602052604081208054859290610c0190849061183e565b925050819055508260046000828254610c1a919061183e565b90915550506003546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081523360048201526024810185905273ffffffffffffffffffffffffffffffffffffffff9091169063a9059cbb90604401602060405180830381600087803b158015610c9157600080fd5b505af1158015610ca5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc99190611601565b5060408051338152602081018590527f87f24005eae1cc90754034c963de08ca37a6d731bbaced837511d8d13d2e064f910160405180910390a133600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff949094168352929052204290555050565b600082815260208190526040902060010154610d5781336110c9565b610d618383611199565b505050565b73ffffffffffffffffffffffffffffffffffffffff81163314610e0b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084016105b5565b610e158282611289565b5050565b6003546040517f23b872dd0000000000000000000000000000000000000000000000000000000081523360048201523060248201526044810183905273ffffffffffffffffffffffffffffffffffffffff909116906323b872dd90606401602060405180830381600087803b158015610e9157600080fd5b505af1158015610ea5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ec99190611601565b610f55576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603e60248201527f426f6e64656453747261746567793a204e6f7420656e6f75676820616c6c6f7760448201527f616e636520746f206d6f7665207769746820676976656e20616d6f756e74000060648201526084016105b5565b3360009081526005602052604081208054839290610f749084906117ae565b925050819055508060046000828254610f8d91906117ae565b909155505033600081815260016020908152604080832060035473ffffffffffffffffffffffffffffffffffffffff1684528252918290204290558151928352820183905280517fd0a009034e24a39106653c4903cf28b1947b8a9964d03206648e0f0a5de74a469281900390910190a150565b60008281526020819052604090206001015461101d81336110c9565b610d618383611289565b6110517fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c2177533610307565b6110b7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f4475726174696f6e47756172643a2041434345535320494e56414c494400000060448201526064016105b5565b60009182526002602052604090912055565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff16610e155761111f8173ffffffffffffffffffffffffffffffffffffffff166014611340565b61112a836020611340565b60405160200161113b9291906116dc565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290527f08c379a00000000000000000000000000000000000000000000000000000000082526105b59160040161175d565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff16610e155760008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff85168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905561122b3390565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff1615610e155760008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516808552925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6060600061134f836002611801565b61135a9060026117ae565b67ffffffffffffffff81111561137257611372611918565b6040519080825280601f01601f19166020018201604052801561139c576020820181803683370190505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106113d3576113d36118e9565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110611436576114366118e9565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506000611472846002611801565b61147d9060016117ae565b90505b600181111561151a577f303132333435363738396162636465660000000000000000000000000000000085600f16601081106114be576114be6118e9565b1a60f81b8282815181106114d4576114d46118e9565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060049490941c9361151381611885565b9050611480565b508315611583576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016105b5565b9392505050565b803573ffffffffffffffffffffffffffffffffffffffff811681146115ae57600080fd5b919050565b6000602082840312156115c557600080fd5b6115838261158a565b600080604083850312156115e157600080fd5b6115ea8361158a565b91506115f86020840161158a565b90509250929050565b60006020828403121561161357600080fd5b8151801515811461158357600080fd5b60006020828403121561163557600080fd5b5035919050565b6000806040838503121561164f57600080fd5b823591506115f86020840161158a565b6000806040838503121561167257600080fd5b50508035926020909101359150565b60006020828403121561169357600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461158357600080fd5b6000602082840312156116d557600080fd5b5051919050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611714816017850160208801611855565b7f206973206d697373696e6720726f6c65200000000000000000000000000000006017918401918201528351611751816028840160208801611855565b01602801949350505050565b602081526000825180602084015261177c816040850160208701611855565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b600082198211156117c1576117c16118ba565b500190565b6000826117fc577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611839576118396118ba565b500290565b600082821015611850576118506118ba565b500390565b60005b83811015611870578181015183820152602001611858565b8381111561187f576000848401525b50505050565b600081611894576118946118ba565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fdfea2646970667358221220d411878acb0f85f44a8ca63fa1c2485455fcc46097b434a565c61804953cab1d64736f6c63430008070033";

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

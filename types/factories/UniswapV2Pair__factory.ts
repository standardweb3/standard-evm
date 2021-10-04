/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { UniswapV2Pair, UniswapV2PairInterface } from "../UniswapV2Pair";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Swap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve0",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve1",
        type: "uint112",
      },
    ],
    name: "Sync",
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
    inputs: [],
    name: "DOMAIN_SEPARATOR",
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
    name: "MINIMUM_LIQUIDITY",
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
    name: "PERMIT_TYPEHASH",
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
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
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
        name: "value",
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
        name: "",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
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
    inputs: [],
    name: "factory",
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
    name: "getReserves",
    outputs: [
      {
        internalType: "uint112",
        name: "_reserve0",
        type: "uint112",
      },
      {
        internalType: "uint112",
        name: "_reserve1",
        type: "uint112",
      },
      {
        internalType: "uint32",
        name: "_blockTimestampLast",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "kLast",
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
        name: "to",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "price0CumulativeLast",
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
    name: "price1CumulativeLast",
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
        name: "to",
        type: "address",
      },
    ],
    name: "skim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_treasuryOn",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_poolOn",
        type: "bool",
      },
    ],
    name: "switchFees",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "sync",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token0",
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
    name: "token1",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
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
];

const _bytecode =
  "0x60806040526001600c5534801561001557600080fd5b50604080518082018252601281527129ba30b73230b93210262a29102a37b5b2b760711b6020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527f75fa2f8697de6252934fe94c712e1e80d4ddffb3a3597ff43cf80c49389aa15c818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a0808301919091528351808303909101815260c09091019092528151910120600355600580546001600160a01b031916331790556007805461ffff60a01b191690556131578061011e6000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c80636a627842116100f9578063ba9a7a5611610097578063d21220a711610071578063d21220a71461060c578063d505accf14610614578063dd62ed3e14610672578063fff6cae9146106ad576101c4565b8063ba9a7a56146105c9578063bc25cf77146105d1578063c45a015514610604576101c4565b80637ecebe00116100d35780637ecebe001461050957806389afcb441461053c57806395d89b4114610588578063a9059cbb14610590576101c4565b80636a6278421461049b57806370a08231146104ce5780637464fc3d14610501576101c4565b806323b872dd116101665780633644e515116101405780633644e51514610448578063485cc955146104505780635909c0d51461048b5780635a3d549314610493576101c4565b806323b872dd146103df57806330adf81f14610422578063313ce5671461042a576101c4565b8063095ea7b3116101a2578063095ea7b3146103205780630dfe16811461036d57806318160ddd1461039e5780631b4782d0146103b8576101c4565b8063022c0d9f146101c957806306fdde03146102645780630902f1ac146102e1575b600080fd5b610262600480360360808110156101df57600080fd5b81359160208101359173ffffffffffffffffffffffffffffffffffffffff604083013516919081019060808101606082013564010000000081111561022357600080fd5b82018360208201111561023557600080fd5b8035906020019184600183028401116401000000008311171561025757600080fd5b5090925090506106b5565b005b61026c610d75565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102a657818101518382015260200161028e565b50505050905090810190601f1680156102d35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102e9610dae565b604080516dffffffffffffffffffffffffffff948516815292909316602083015263ffffffff168183015290519081900360600190f35b6103596004803603604081101561033657600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610e03565b604080519115158252519081900360200190f35b610375610e1a565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6103a6610e36565b60408051918252519081900360200190f35b610262600480360360408110156103ce57600080fd5b508035151590602001351515610e3c565b610359600480360360608110156103f557600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060400135610fdf565b6103a66110b8565b6104326110dc565b6040805160ff9092168252519081900360200190f35b6103a66110e1565b6102626004803603604081101561046657600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160200135166110e7565b6103a66111c0565b6103a66111c6565b6103a6600480360360208110156104b157600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166111cc565b6103a6600480360360208110156104e457600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166117b0565b6103a66117c2565b6103a66004803603602081101561051f57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166117c8565b61056f6004803603602081101561055257600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166117da565b6040805192835260208301919091528051918290030190f35b61026c611c65565b610359600480360360408110156105a657600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135611c9e565b6103a6611cab565b610262600480360360208110156105e757600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611cb1565b610375611e9e565b610375611eba565b610262600480360360e081101561062a57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135611ed6565b6103a66004803603604081101561068857600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160200135166121a2565b6102626121bf565b600c5460011461072657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4c697465723a204c4f434b454400000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c55841515806107395750600084115b61078e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001806130dd6021913960400191505060405180910390fd5b600080610799610dae565b5091509150816dffffffffffffffffffffffffffff16871080156107cc5750806dffffffffffffffffffffffffffff1686105b61083757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f4c697465723a20494e53554646494349454e545f4c4951554944495459000000604482015290519081900360640190fd5b600654600754600091829173ffffffffffffffffffffffffffffffffffffffff91821691908116908916821480159061089c57508073ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff1614155b61090757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f4c697465723a20494e56414c49445f544f000000000000000000000000000000604482015290519081900360640190fd5b8a1561091857610918828a8d6123a5565b891561092957610929818a8c6123a5565b86156109f5578873ffffffffffffffffffffffffffffffffffffffff166310d1e85c338d8d8c8c6040518663ffffffff1660e01b8152600401808673ffffffffffffffffffffffffffffffffffffffff168152602001858152602001848152602001806020018281038252848482818152602001925080828437600081840152601f19601f8201169050808301925050509650505050505050600060405180830381600087803b1580156109dc57600080fd5b505af11580156109f0573d6000803e3d6000fd5b505050505b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8416916370a08231916024808301926020929190829003018186803b158015610a6157600080fd5b505afa158015610a75573d6000803e3d6000fd5b505050506040513d6020811015610a8b57600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191955073ffffffffffffffffffffffffffffffffffffffff8316916370a0823191602480820192602092909190829003018186803b158015610afd57600080fd5b505afa158015610b11573d6000803e3d6000fd5b505050506040513d6020811015610b2757600080fd5b5051925060009150506dffffffffffffffffffffffffffff85168a90038311610b51576000610b67565b89856dffffffffffffffffffffffffffff160383035b9050600089856dffffffffffffffffffffffffffff16038311610b8b576000610ba1565b89856dffffffffffffffffffffffffffff160383035b90506000821180610bb25750600081115b610c1d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4c697465723a20494e53554646494349454e545f494e5055545f414d4f554e54604482015290519081900360640190fd5b6000610c3f610c2d8460036125b2565b610c39876103e86125b2565b90612638565b90506000610c51610c2d8460036125b2565b9050610c7d620f4240610c776dffffffffffffffffffffffffffff8b8116908b166125b2565b906125b2565b610c8783836125b2565b1015610cf457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f4c697465723a204b000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b5050610d02848488886126aa565b60408051838152602081018390528082018d9052606081018c9052905173ffffffffffffffffffffffffffffffffffffffff8b169133917fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d8229181900360800190a350506001600c55505050505050505050565b6040518060400160405280601281526020017f5374616e64617264204c545220546f6b656e000000000000000000000000000081525081565b6008546dffffffffffffffffffffffffffff808216926e0100000000000000000000000000008304909116917c0100000000000000000000000000000000000000000000000000000000900463ffffffff1690565b6000610e10338484612960565b5060015b92915050565b60065473ffffffffffffffffffffffffffffffffffffffff1681565b60005481565b600554604080517f094b74150000000000000000000000000000000000000000000000000000000081529051339273ffffffffffffffffffffffffffffffffffffffff169163094b7415916004808301926020929190829003018186803b158015610ea657600080fd5b505afa158015610eba573d6000803e3d6000fd5b505050506040513d6020811015610ed057600080fd5b505173ffffffffffffffffffffffffffffffffffffffff1614610f5457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b600780549115157501000000000000000000000000000000000000000000027fffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffffff93151574010000000000000000000000000000000000000000027fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff9093169290921792909216179055565b73ffffffffffffffffffffffffffffffffffffffff831660009081526002602090815260408083203384529091528120547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff146110a35773ffffffffffffffffffffffffffffffffffffffff841660009081526002602090815260408083203384529091529020546110719083612638565b73ffffffffffffffffffffffffffffffffffffffff851660009081526002602090815260408083203384529091529020555b6110ae8484846129cf565b5060019392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601281565b60035481565b60055473ffffffffffffffffffffffffffffffffffffffff16331461116d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b6006805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff00000000000000000000000000000000000000009182161790915560078054929093169116179055565b60095481565b600a5481565b6000600c5460011461123f57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4c697465723a204c4f434b454400000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c8190558061124f610dae565b50600654604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905193955091935060009273ffffffffffffffffffffffffffffffffffffffff909116916370a08231916024808301926020929190829003018186803b1580156112c957600080fd5b505afa1580156112dd573d6000803e3d6000fd5b505050506040513d60208110156112f357600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905192935060009273ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b15801561136c57600080fd5b505afa158015611380573d6000803e3d6000fd5b505050506040513d602081101561139657600080fd5b5051905060006113b6836dffffffffffffffffffffffffffff8716612638565b905060006113d4836dffffffffffffffffffffffffffff8716612638565b905060006113e28787612aa4565b6000549091508061166757600554604080517f7cd07e47000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff1691637cd07e47916004808301926020929190829003018186803b15801561145857600080fd5b505afa15801561146c573d6000803e3d6000fd5b505050506040513d602081101561148257600080fd5b505190503373ffffffffffffffffffffffffffffffffffffffff821614156115b7578073ffffffffffffffffffffffffffffffffffffffff166340dc0e376040518163ffffffff1660e01b815260040160206040518083038186803b1580156114ea57600080fd5b505afa1580156114fe573d6000803e3d6000fd5b505050506040513d602081101561151457600080fd5b50519950891580159061154757507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8a14155b6115b257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f4261642064657369726564206c69717569646974790000000000000000000000604482015290519081900360640190fd5b611661565b73ffffffffffffffffffffffffffffffffffffffff81161561163a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4d757374206e6f742068617665206d69677261746f7200000000000000000000604482015290519081900360640190fd5b6116526103e8610c3961164d88886125b2565b612e1a565b995061166160006103e8612e6c565b506116b8565b6116b56dffffffffffffffffffffffffffff891661168586846125b2565b8161168c57fe5b046dffffffffffffffffffffffffffff89166116a886856125b2565b816116af57fe5b04612f10565b98505b60008911611711576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806130b96024913960400191505060405180910390fd5b61171b8a8a612e6c565b61172786868a8a6126aa565b81156117635760085461175f906dffffffffffffffffffffffffffff808216916e0100000000000000000000000000009004166125b2565b600b555b6040805185815260208101859052815133927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a250506001600c5550949695505050505050565b60016020526000908152604090205481565b600b5481565b60046020526000908152604090205481565b600080600c5460011461184e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4c697465723a204c4f434b454400000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c8190558061185e610dae565b50600654600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905194965092945073ffffffffffffffffffffffffffffffffffffffff9182169391169160009184916370a08231916024808301926020929190829003018186803b1580156118e057600080fd5b505afa1580156118f4573d6000803e3d6000fd5b505050506040513d602081101561190a57600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191925060009173ffffffffffffffffffffffffffffffffffffffff8516916370a08231916024808301926020929190829003018186803b15801561197e57600080fd5b505afa158015611992573d6000803e3d6000fd5b505050506040513d60208110156119a857600080fd5b5051306000908152600160205260408120549192506119c78888612aa4565b600054909150806119d884876125b2565b816119df57fe5b049a50806119ed84866125b2565b816119f457fe5b04995060008b118015611a07575060008a115b611a5c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806130fe6024913960400191505060405180910390fd5b611a663084612f28565b611a71878d8d6123a5565b611a7c868d8c6123a5565b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8916916370a08231916024808301926020929190829003018186803b158015611ae857600080fd5b505afa158015611afc573d6000803e3d6000fd5b505050506040513d6020811015611b1257600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191965073ffffffffffffffffffffffffffffffffffffffff8816916370a0823191602480820192602092909190829003018186803b158015611b8457600080fd5b505afa158015611b98573d6000803e3d6000fd5b505050506040513d6020811015611bae57600080fd5b50519350611bbe85858b8b6126aa565b8115611bfa57600854611bf6906dffffffffffffffffffffffffffff808216916e0100000000000000000000000000009004166125b2565b600b555b604080518c8152602081018c9052815173ffffffffffffffffffffffffffffffffffffffff8f169233927fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496929081900390910190a35050505050505050506001600c81905550915091565b6040518060400160405280600381526020017f4c5452000000000000000000000000000000000000000000000000000000000081525081565b6000610e103384846129cf565b6103e881565b600c54600114611d2257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4c697465723a204c4f434b454400000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c55600654600754600854604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff9485169490931692611df89285928792611df3926dffffffffffffffffffffffffffff169185916370a0823191602480820192602092909190829003018186803b158015611dc157600080fd5b505afa158015611dd5573d6000803e3d6000fd5b505050506040513d6020811015611deb57600080fd5b505190612638565b6123a5565b611e948184611df36008600e9054906101000a90046dffffffffffffffffffffffffffff166dffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015611dc157600080fd5b50506001600c5550565b60055473ffffffffffffffffffffffffffffffffffffffff1681565b60075473ffffffffffffffffffffffffffffffffffffffff1681565b42841015611f4557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f556e697377617056323a20455850495245440000000000000000000000000000604482015290519081900360640190fd5b60035473ffffffffffffffffffffffffffffffffffffffff80891660008181526004602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958d166060860152608085018c905260a085019590955260c08085018b90528151808603909101815260e0850182528051908301207f19010000000000000000000000000000000000000000000000000000000000006101008601526101028501969096526101228085019690965280518085039096018652610142840180825286519683019690962095839052610162840180825286905260ff89166101828501526101a284018890526101c28401879052519193926101e2808201937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081019281900390910190855afa1580156120a6573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff81161580159061212157508873ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b61218c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f556e697377617056323a20494e56414c49445f5349474e415455524500000000604482015290519081900360640190fd5b612197898989612960565b505050505050505050565b600260209081526000928352604080842090915290825290205481565b600c5460011461223057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4c697465723a204c4f434b454400000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c55600654604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905161239e9273ffffffffffffffffffffffffffffffffffffffff16916370a08231916024808301926020929190829003018186803b1580156122a757600080fd5b505afa1580156122bb573d6000803e3d6000fd5b505050506040513d60208110156122d157600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b15801561234457600080fd5b505afa158015612358573d6000803e3d6000fd5b505050506040513d602081101561236e57600080fd5b50516008546dffffffffffffffffffffffffffff808216916e0100000000000000000000000000009004166126aa565b6001600c55565b604080518082018252601981527f7472616e7366657228616464726573732c75696e743235362900000000000000602091820152815173ffffffffffffffffffffffffffffffffffffffff85811660248301526044808301869052845180840390910181526064909201845291810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001781529251815160009460609489169392918291908083835b602083106124ab57805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0909201916020918201910161246e565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d806000811461250d576040519150601f19603f3d011682016040523d82523d6000602084013e612512565b606091505b5091509150818015612540575080511580612540575080806020019051602081101561253d57600080fd5b50515b6125ab57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4c697465723a205452414e534645525f4641494c454400000000000000000000604482015290519081900360640190fd5b5050505050565b60008115806125cd575050808202828282816125ca57fe5b04145b610e1457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6d756c2d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b80820382811115610e1457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f64732d6d6174682d7375622d756e646572666c6f770000000000000000000000604482015290519081900360640190fd5b6dffffffffffffffffffffffffffff84118015906126d657506dffffffffffffffffffffffffffff8311155b61274157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4c697465723a204f564552464c4f570000000000000000000000000000000000604482015290519081900360640190fd5b60085463ffffffff428116917c01000000000000000000000000000000000000000000000000000000009004811682039081161580159061279157506dffffffffffffffffffffffffffff841615155b80156127ac57506dffffffffffffffffffffffffffff831615155b15612856578063ffffffff166127e9856127c586612fe1565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1690613005565b600980547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff929092169290920201905563ffffffff8116612829846127c587612fe1565b600a80547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff92909216929092020190555b600880547fffffffffffffffffffffffffffffffffffff0000000000000000000000000000166dffffffffffffffffffffffffffff888116919091177fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff166e0100000000000000000000000000008883168102919091177bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167c010000000000000000000000000000000000000000000000000000000063ffffffff871602179283905560408051848416815291909304909116602082015281517f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1929181900390910190a1505050505050565b73ffffffffffffffffffffffffffffffffffffffff808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600160205260409020546129ff9082612638565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152600160205260408082209390935590841681522054612a3b9082613046565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b158015612b0f57600080fd5b505afa158015612b23573d6000803e3d6000fd5b505050506040513d6020811015612b3957600080fd5b5051600554604080517faef99eb3000000000000000000000000000000000000000000000000000000008152905192935060009273ffffffffffffffffffffffffffffffffffffffff9092169163aef99eb391600480820192602092909190829003018186803b158015612bac57600080fd5b505afa158015612bc0573d6000803e3d6000fd5b505050506040513d6020811015612bd657600080fd5b5051600554604080517f42079671000000000000000000000000000000000000000000000000000000008152905192935060009273ffffffffffffffffffffffffffffffffffffffff90921691634207967191600480820192602092909190829003018186803b158015612c4957600080fd5b505afa158015612c5d573d6000803e3d6000fd5b505050506040513d6020811015612c7357600080fd5b505173ffffffffffffffffffffffffffffffffffffffff84811615159550909150600090831615801590612cc257506007547501000000000000000000000000000000000000000000900460ff165b9050600073ffffffffffffffffffffffffffffffffffffffff831615801590612d05575060075474010000000000000000000000000000000000000000900460ff165b600b549091508615612e02578015612dfd576000612d3961164d6dffffffffffffffffffffffffffff8c8116908c166125b2565b90506000612d4683612e1a565b905080821115612dfa576000612d68612d5f8484612638565b600054906125b2565b90506000612d8183612d7b8660056125b2565b90613046565b90506000818381612d8e57fe5b0490508015612df6578715612dbb5760028104612dab8b82612e6c565b612db58c82612e6c565b50612df6565b878015612dc55750865b15612dec5760038104612dd88b82612e6c565b612de28c82612e6c565b612db58a82612e6c565b612df68b82612e6c565b5050505b50505b612e0e565b8015612e0e576000600b555b50505050505092915050565b60006003821115612e5d575080600160028204015b81811015612e5757809150600281828581612e4657fe5b040181612e4f57fe5b049050612e2f565b50612e67565b8115612e67575060015b919050565b600054612e799082613046565b600090815573ffffffffffffffffffffffffffffffffffffffff8316815260016020526040902054612eab9082613046565b73ffffffffffffffffffffffffffffffffffffffff831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6000818310612f1f5781612f21565b825b9392505050565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902054612f589082612638565b73ffffffffffffffffffffffffffffffffffffffff831660009081526001602052604081209190915554612f8c9082612638565b600090815560408051838152905173ffffffffffffffffffffffffffffffffffffffff8516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef919081900360200190a35050565b6dffffffffffffffffffffffffffff166e0100000000000000000000000000000290565b60006dffffffffffffffffffffffffffff82167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff84168161303e57fe5b049392505050565b80820182811015610e1457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6164642d6f766572666c6f77000000000000000000000000604482015290519081900360640190fdfe4c697465723a20494e53554646494349454e545f4c49515549444954595f4d494e5445444c697465723a20494e53554646494349454e545f4f55545055545f414d4f554e544c697465723a20494e53554646494349454e545f4c49515549444954595f4255524e4544a2646970667358221220fd6dc11c44a8c6f22a3a025741fa1b949ad4a78282c472c304623323d681cb5b64736f6c634300060c0033";

export class UniswapV2Pair__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UniswapV2Pair> {
    return super.deploy(overrides || {}) as Promise<UniswapV2Pair>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): UniswapV2Pair {
    return super.attach(address) as UniswapV2Pair;
  }
  connect(signer: Signer): UniswapV2Pair__factory {
    return super.connect(signer) as UniswapV2Pair__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniswapV2PairInterface {
    return new utils.Interface(_abi) as UniswapV2PairInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapV2Pair {
    return new Contract(address, _abi, signerOrProvider) as UniswapV2Pair;
  }
}

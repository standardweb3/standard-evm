/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  UniswapV2Factory,
  UniswapV2FactoryInterface,
} from "../UniswapV2Factory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeToSetter",
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
        indexed: true,
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "PairCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allPairs",
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
    name: "allPairsLength",
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
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
    ],
    name: "createPair",
    outputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feeTo",
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
    name: "feeToSetter",
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
    name: "getPair",
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
    name: "migrator",
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
    name: "pairCodeHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "poolTo",
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
        internalType: "address",
        name: "_feeTo",
        type: "address",
      },
    ],
    name: "setFeeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeToSetter",
        type: "address",
      },
    ],
    name: "setFeeToSetter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_migrator",
        type: "address",
      },
    ],
    name: "setMigrator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_poolTo",
        type: "address",
      },
    ],
    name: "setPoolTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasuryTo",
        type: "address",
      },
    ],
    name: "setTreasuryTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasuryTo",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516140313803806140318339818101604052602081101561003357600080fd5b5051600380546001600160a01b0319166001600160a01b03909216919091179055613fce806100636000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063574f2ba311610097578063aef99eb311610066578063aef99eb314610250578063c9c6539614610258578063e6a4390514610293578063f46901ed146102ce576100f5565b8063574f2ba3146101f35780637cd07e471461020d5780639aab924814610215578063a2e74af61461021d576100f5565b80631e3dd18b116100d35780631e3dd18b1461016857806323cf3118146101855780632d6ec309146101b857806342079671146101eb576100f5565b8063017e7e58146100fa57806308b60fb81461012b578063094b741514610160575b600080fd5b610102610301565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b61015e6004803603602081101561014157600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661031d565b005b6101026103ea565b6101026004803603602081101561017e57600080fd5b5035610406565b61015e6004803603602081101561019b57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661043a565b61015e600480360360208110156101ce57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610507565b6101026105d4565b6101fb6105f0565b60408051918252519081900360200190f35b6101026105f6565b6101fb610612565b61015e6004803603602081101561023357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610644565b610102610711565b6101026004803603604081101561026e57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602001351661072d565b610102600480360360408110156102a957600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020013516610b61565b61015e600480360360208110156102e457600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610b94565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60035473ffffffffffffffffffffffffffffffffffffffff1633146103a357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60035473ffffffffffffffffffffffffffffffffffffffff1681565b6006818154811061041357fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16905081565b60035473ffffffffffffffffffffffffffffffffffffffff1633146104c057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b600480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60035473ffffffffffffffffffffffffffffffffffffffff16331461058d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b60065490565b60045473ffffffffffffffffffffffffffffffffffffffff1681565b60006040518060200161062490610c61565b6020820181038252601f19601f8201166040525080519060200120905090565b60035473ffffffffffffffffffffffffffffffffffffffff1633146106ca57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b600380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60008173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156107ca57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f4c697465723a204944454e544943414c5f414444524553534553000000000000604482015290519081900360640190fd5b6000808373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161061080757838561080a565b84845b909250905073ffffffffffffffffffffffffffffffffffffffff821661089157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f4c697465723a205a45524f5f4144445245535300000000000000000000000000604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff82811660009081526005602090815260408083208585168452909152902054161561093257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f4c697465723a20504149525f4558495354530000000000000000000000000000604482015290519081900360640190fd5b60606040518060200161094490610c61565b6020820181038252601f19601f82011660405250905060008383604051602001808373ffffffffffffffffffffffffffffffffffffffff1660601b81526014018273ffffffffffffffffffffffffffffffffffffffff1660601b815260140192505050604051602081830303815290604052805190602001209050808251602084016000f594508473ffffffffffffffffffffffffffffffffffffffff1663485cc95585856040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b158015610a5257600080fd5b505af1158015610a66573d6000803e3d6000fd5b5050505073ffffffffffffffffffffffffffffffffffffffff84811660008181526005602081815260408084208987168086529083528185208054978d167fffffffffffffffffffffffff000000000000000000000000000000000000000098891681179091559383528185208686528352818520805488168517905560068054600181018255958190527ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f90950180549097168417909655925483519283529082015281517f0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9929181900390910190a35050505092915050565b600560209081526000928352604080842090915290825290205473ffffffffffffffffffffffffffffffffffffffff1681565b60035473ffffffffffffffffffffffffffffffffffffffff163314610c1a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b61332a80610c6f8339019056fe60806040526001600c5534801561001557600080fd5b50604080518082018252601281527129ba30b73230b93210262a29102a37b5b2b760711b6020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527f75fa2f8697de6252934fe94c712e1e80d4ddffb3a3597ff43cf80c49389aa15c818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a0808301919091528351808303909101815260c09091019092528151910120600355600580546001600160a01b031916331790556007805461ffff60a01b1916905561320c8061011e6000396000f3fe608060405234801561001057600080fd5b50600436106101da5760003560e01c806361d027b311610104578063a9059cbb116100a2578063d21220a711610071578063d21220a714610632578063d505accf1461063a578063dd62ed3e14610698578063fff6cae9146106d3576101da565b8063a9059cbb146105b6578063ba9a7a56146105ef578063bc25cf77146105f7578063c45a01551461062a576101da565b80637464fc3d116100de5780637464fc3d146105275780637ecebe001461052f57806389afcb441461056257806395d89b41146105ae576101da565b806361d027b3146104b95780636a627842146104c157806370a08231146104f4576101da565b80631b4782d01161017c5780633644e5151161014b5780633644e51514610466578063485cc9551461046e5780635909c0d5146104a95780635a3d5493146104b1576101da565b80631b4782d0146103d657806323b872dd146103fd57806330adf81f14610440578063313ce56714610448576101da565b8063095ea7b3116101b8578063095ea7b3146103365780630dfe16811461038357806316f0115b146103b457806318160ddd146103bc576101da565b8063022c0d9f146101df57806306fdde031461027a5780630902f1ac146102f7575b600080fd5b610278600480360360808110156101f557600080fd5b81359160208101359173ffffffffffffffffffffffffffffffffffffffff604083013516919081019060808101606082013564010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b5090925090506106db565b005b610282610d9b565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102bc5781810151838201526020016102a4565b50505050905090810190601f1680156102e95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102ff610dd4565b604080516dffffffffffffffffffffffffffff948516815292909316602083015263ffffffff168183015290519081900360600190f35b61036f6004803603604081101561034c57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610e29565b604080519115158252519081900360200190f35b61038b610e40565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b61036f610e5c565b6103c4610e7e565b60408051918252519081900360200190f35b610278600480360360408110156103ec57600080fd5b508035151590602001351515610e84565b61036f6004803603606081101561041357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060400135611075565b6103c461114e565b610450611172565b6040805160ff9092168252519081900360200190f35b6103c4611177565b6102786004803603604081101561048457600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602001351661117d565b6103c4611256565b6103c461125c565b61036f611262565b6103c4600480360360208110156104d757600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611283565b6103c46004803603602081101561050a57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611867565b6103c4611879565b6103c46004803603602081101561054557600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661187f565b6105956004803603602081101561057857600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611891565b6040805192835260208301919091528051918290030190f35b610282611d1c565b61036f600480360360408110156105cc57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135611d55565b6103c4611d62565b6102786004803603602081101561060d57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611d68565b61038b611f55565b61038b611f71565b610278600480360360e081101561065057600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135611f8d565b6103c4600480360360408110156106ae57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020013516612259565b610278612276565b600c5460011461074c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4c697465723a204c4f434b454400000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c558415158061075f5750600084115b6107b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001806131926021913960400191505060405180910390fd5b6000806107bf610dd4565b5091509150816dffffffffffffffffffffffffffff16871080156107f25750806dffffffffffffffffffffffffffff1686105b61085d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f4c697465723a20494e53554646494349454e545f4c4951554944495459000000604482015290519081900360640190fd5b600654600754600091829173ffffffffffffffffffffffffffffffffffffffff9182169190811690891682148015906108c257508073ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff1614155b61092d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f4c697465723a20494e56414c49445f544f000000000000000000000000000000604482015290519081900360640190fd5b8a1561093e5761093e828a8d61245c565b891561094f5761094f818a8c61245c565b8615610a1b578873ffffffffffffffffffffffffffffffffffffffff166310d1e85c338d8d8c8c6040518663ffffffff1660e01b8152600401808673ffffffffffffffffffffffffffffffffffffffff168152602001858152602001848152602001806020018281038252848482818152602001925080828437600081840152601f19601f8201169050808301925050509650505050505050600060405180830381600087803b158015610a0257600080fd5b505af1158015610a16573d6000803e3d6000fd5b505050505b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8416916370a08231916024808301926020929190829003018186803b158015610a8757600080fd5b505afa158015610a9b573d6000803e3d6000fd5b505050506040513d6020811015610ab157600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191955073ffffffffffffffffffffffffffffffffffffffff8316916370a0823191602480820192602092909190829003018186803b158015610b2357600080fd5b505afa158015610b37573d6000803e3d6000fd5b505050506040513d6020811015610b4d57600080fd5b5051925060009150506dffffffffffffffffffffffffffff85168a90038311610b77576000610b8d565b89856dffffffffffffffffffffffffffff160383035b9050600089856dffffffffffffffffffffffffffff16038311610bb1576000610bc7565b89856dffffffffffffffffffffffffffff160383035b90506000821180610bd85750600081115b610c4357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4c697465723a20494e53554646494349454e545f494e5055545f414d4f554e54604482015290519081900360640190fd5b6000610c65610c53846003612669565b610c5f876103e8612669565b906126ef565b90506000610c77610c53846003612669565b9050610ca3620f4240610c9d6dffffffffffffffffffffffffffff8b8116908b16612669565b90612669565b610cad8383612669565b1015610d1a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f4c697465723a204b000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b5050610d2884848888612761565b60408051838152602081018390528082018d9052606081018c9052905173ffffffffffffffffffffffffffffffffffffffff8b169133917fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d8229181900360800190a350506001600c55505050505050505050565b6040518060400160405280601281526020017f5374616e64617264204c545220546f6b656e000000000000000000000000000081525081565b6008546dffffffffffffffffffffffffffff808216926e0100000000000000000000000000008304909116917c0100000000000000000000000000000000000000000000000000000000900463ffffffff1690565b6000610e36338484612a17565b5060015b92915050565b60065473ffffffffffffffffffffffffffffffffffffffff1681565b6007547501000000000000000000000000000000000000000000900460ff1681565b60005481565b600554604080517f094b74150000000000000000000000000000000000000000000000000000000081529051339273ffffffffffffffffffffffffffffffffffffffff169163094b7415916004808301926020929190829003018186803b158015610eee57600080fd5b505afa158015610f02573d6000803e3d6000fd5b505050506040513d6020811015610f1857600080fd5b505173ffffffffffffffffffffffffffffffffffffffff1614610f9c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b6007805482151575010000000000000000000000000000000000000000009081027fffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffffff861515740100000000000000000000000000000000000000009081027fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff909516949094171617928390556040805192840460ff9081161515845291909304161515602082015281517ff6c1ff6d5faa01a8a20b9d6ae91346ce5a998b9633448f9d8b6e52ac98d18299929181900390910190a15050565b73ffffffffffffffffffffffffffffffffffffffff831660009081526002602090815260408083203384529091528120547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff146111395773ffffffffffffffffffffffffffffffffffffffff8416600090815260026020908152604080832033845290915290205461110790836126ef565b73ffffffffffffffffffffffffffffffffffffffff851660009081526002602090815260408083203384529091529020555b611144848484612a86565b5060019392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601281565b60035481565b60055473ffffffffffffffffffffffffffffffffffffffff16331461120357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b6006805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff00000000000000000000000000000000000000009182161790915560078054929093169116179055565b60095481565b600a5481565b60075474010000000000000000000000000000000000000000900460ff1681565b6000600c546001146112f657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4c697465723a204c4f434b454400000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c81905580611306610dd4565b50600654604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905193955091935060009273ffffffffffffffffffffffffffffffffffffffff909116916370a08231916024808301926020929190829003018186803b15801561138057600080fd5b505afa158015611394573d6000803e3d6000fd5b505050506040513d60208110156113aa57600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905192935060009273ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b15801561142357600080fd5b505afa158015611437573d6000803e3d6000fd5b505050506040513d602081101561144d57600080fd5b50519050600061146d836dffffffffffffffffffffffffffff87166126ef565b9050600061148b836dffffffffffffffffffffffffffff87166126ef565b905060006114998787612b5b565b6000549091508061171e57600554604080517f7cd07e47000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff1691637cd07e47916004808301926020929190829003018186803b15801561150f57600080fd5b505afa158015611523573d6000803e3d6000fd5b505050506040513d602081101561153957600080fd5b505190503373ffffffffffffffffffffffffffffffffffffffff8216141561166e578073ffffffffffffffffffffffffffffffffffffffff166340dc0e376040518163ffffffff1660e01b815260040160206040518083038186803b1580156115a157600080fd5b505afa1580156115b5573d6000803e3d6000fd5b505050506040513d60208110156115cb57600080fd5b5051995089158015906115fe57507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8a14155b61166957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f4261642064657369726564206c69717569646974790000000000000000000000604482015290519081900360640190fd5b611718565b73ffffffffffffffffffffffffffffffffffffffff8116156116f157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4d757374206e6f742068617665206d69677261746f7200000000000000000000604482015290519081900360640190fd5b6117096103e8610c5f6117048888612669565b612ecf565b995061171860006103e8612f21565b5061176f565b61176c6dffffffffffffffffffffffffffff891661173c8684612669565b8161174357fe5b046dffffffffffffffffffffffffffff891661175f8685612669565b8161176657fe5b04612fc5565b98505b600089116117c8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602481526020018061316e6024913960400191505060405180910390fd5b6117d28a8a612f21565b6117de86868a8a612761565b811561181a57600854611816906dffffffffffffffffffffffffffff808216916e010000000000000000000000000000900416612669565b600b555b6040805185815260208101859052815133927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a250506001600c5550949695505050505050565b60016020526000908152604090205481565b600b5481565b60046020526000908152604090205481565b600080600c5460011461190557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4c697465723a204c4f434b454400000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c81905580611915610dd4565b50600654600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905194965092945073ffffffffffffffffffffffffffffffffffffffff9182169391169160009184916370a08231916024808301926020929190829003018186803b15801561199757600080fd5b505afa1580156119ab573d6000803e3d6000fd5b505050506040513d60208110156119c157600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191925060009173ffffffffffffffffffffffffffffffffffffffff8516916370a08231916024808301926020929190829003018186803b158015611a3557600080fd5b505afa158015611a49573d6000803e3d6000fd5b505050506040513d6020811015611a5f57600080fd5b505130600090815260016020526040812054919250611a7e8888612b5b565b60005490915080611a8f8487612669565b81611a9657fe5b049a5080611aa48486612669565b81611aab57fe5b04995060008b118015611abe575060008a115b611b13576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806131b36024913960400191505060405180910390fd5b611b1d3084612fdd565b611b28878d8d61245c565b611b33868d8c61245c565b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8916916370a08231916024808301926020929190829003018186803b158015611b9f57600080fd5b505afa158015611bb3573d6000803e3d6000fd5b505050506040513d6020811015611bc957600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191965073ffffffffffffffffffffffffffffffffffffffff8816916370a0823191602480820192602092909190829003018186803b158015611c3b57600080fd5b505afa158015611c4f573d6000803e3d6000fd5b505050506040513d6020811015611c6557600080fd5b50519350611c7585858b8b612761565b8115611cb157600854611cad906dffffffffffffffffffffffffffff808216916e010000000000000000000000000000900416612669565b600b555b604080518c8152602081018c9052815173ffffffffffffffffffffffffffffffffffffffff8f169233927fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496929081900390910190a35050505050505050506001600c81905550915091565b6040518060400160405280600381526020017f4c5452000000000000000000000000000000000000000000000000000000000081525081565b6000610e36338484612a86565b6103e881565b600c54600114611dd957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4c697465723a204c4f434b454400000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c55600654600754600854604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff9485169490931692611eaf9285928792611eaa926dffffffffffffffffffffffffffff169185916370a0823191602480820192602092909190829003018186803b158015611e7857600080fd5b505afa158015611e8c573d6000803e3d6000fd5b505050506040513d6020811015611ea257600080fd5b5051906126ef565b61245c565b611f4b8184611eaa6008600e9054906101000a90046dffffffffffffffffffffffffffff166dffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015611e7857600080fd5b50506001600c5550565b60055473ffffffffffffffffffffffffffffffffffffffff1681565b60075473ffffffffffffffffffffffffffffffffffffffff1681565b42841015611ffc57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f556e697377617056323a20455850495245440000000000000000000000000000604482015290519081900360640190fd5b60035473ffffffffffffffffffffffffffffffffffffffff80891660008181526004602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958d166060860152608085018c905260a085019590955260c08085018b90528151808603909101815260e0850182528051908301207f19010000000000000000000000000000000000000000000000000000000000006101008601526101028501969096526101228085019690965280518085039096018652610142840180825286519683019690962095839052610162840180825286905260ff89166101828501526101a284018890526101c28401879052519193926101e2808201937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081019281900390910190855afa15801561215d573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff8116158015906121d857508873ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b61224357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f556e697377617056323a20494e56414c49445f5349474e415455524500000000604482015290519081900360640190fd5b61224e898989612a17565b505050505050505050565b600260209081526000928352604080842090915290825290205481565b600c546001146122e757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4c697465723a204c4f434b454400000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c55600654604080517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015290516124559273ffffffffffffffffffffffffffffffffffffffff16916370a08231916024808301926020929190829003018186803b15801561235e57600080fd5b505afa158015612372573d6000803e3d6000fd5b505050506040513d602081101561238857600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b1580156123fb57600080fd5b505afa15801561240f573d6000803e3d6000fd5b505050506040513d602081101561242557600080fd5b50516008546dffffffffffffffffffffffffffff808216916e010000000000000000000000000000900416612761565b6001600c55565b604080518082018252601981527f7472616e7366657228616464726573732c75696e743235362900000000000000602091820152815173ffffffffffffffffffffffffffffffffffffffff85811660248301526044808301869052845180840390910181526064909201845291810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001781529251815160009460609489169392918291908083835b6020831061256257805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101612525565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146125c4576040519150601f19603f3d011682016040523d82523d6000602084013e6125c9565b606091505b50915091508180156125f75750805115806125f757508080602001905160208110156125f457600080fd5b50515b61266257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4c697465723a205452414e534645525f4641494c454400000000000000000000604482015290519081900360640190fd5b5050505050565b60008115806126845750508082028282828161268157fe5b04145b610e3a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6d756c2d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b80820382811115610e3a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f64732d6d6174682d7375622d756e646572666c6f770000000000000000000000604482015290519081900360640190fd5b6dffffffffffffffffffffffffffff841180159061278d57506dffffffffffffffffffffffffffff8311155b6127f857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4c697465723a204f564552464c4f570000000000000000000000000000000000604482015290519081900360640190fd5b60085463ffffffff428116917c01000000000000000000000000000000000000000000000000000000009004811682039081161580159061284857506dffffffffffffffffffffffffffff841615155b801561286357506dffffffffffffffffffffffffffff831615155b1561290d578063ffffffff166128a08561287c86613096565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16906130ba565b600980547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff929092169290920201905563ffffffff81166128e08461287c87613096565b600a80547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff92909216929092020190555b600880547fffffffffffffffffffffffffffffffffffff0000000000000000000000000000166dffffffffffffffffffffffffffff888116919091177fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff166e0100000000000000000000000000008883168102919091177bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167c010000000000000000000000000000000000000000000000000000000063ffffffff871602179283905560408051848416815291909304909116602082015281517f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1929181900390910190a1505050505050565b73ffffffffffffffffffffffffffffffffffffffff808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260016020526040902054612ab690826126ef565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152600160205260408082209390935590841681522054612af290826130fb565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b158015612bc657600080fd5b505afa158015612bda573d6000803e3d6000fd5b505050506040513d6020811015612bf057600080fd5b5051600554604080517faef99eb3000000000000000000000000000000000000000000000000000000008152905192935060009273ffffffffffffffffffffffffffffffffffffffff9092169163aef99eb391600480820192602092909190829003018186803b158015612c6357600080fd5b505afa158015612c77573d6000803e3d6000fd5b505050506040513d6020811015612c8d57600080fd5b5051600554604080517f42079671000000000000000000000000000000000000000000000000000000008152905192935060009273ffffffffffffffffffffffffffffffffffffffff90921691634207967191600480820192602092909190829003018186803b158015612d0057600080fd5b505afa158015612d14573d6000803e3d6000fd5b505050506040513d6020811015612d2a57600080fd5b505173ffffffffffffffffffffffffffffffffffffffff84811615159550909150600090831615801590612d7957506007547501000000000000000000000000000000000000000000900460ff165b9050600073ffffffffffffffffffffffffffffffffffffffff831615801590612dbc575060075474010000000000000000000000000000000000000000900460ff165b600b549091508615612eb7578015612eb2576000612df06117046dffffffffffffffffffffffffffff8c8116908c16612669565b90506000612dfd83612ecf565b905080821115612eaf576000612e1f612e1684846126ef565b60005490612669565b90506000612e3883612e32866005612669565b906130fb565b90506000818381612e4557fe5b0490508015612eab578715612ea1578615612e825760038104612e688b82612f21565b612e728c82612f21565b612e7c8a82612f21565b50612e9c565b60028104612e908b82612f21565b612e9a8c82612f21565b505b612eab565b612eab8b82612f21565b5050505b50505b612ec3565b8015612ec3576000600b555b50505050505092915050565b60006003821115612f12575080600160028204015b81811015612f0c57809150600281828581612efb57fe5b040181612f0457fe5b049050612ee4565b50612f1c565b8115612f1c575060015b919050565b600054612f2e90826130fb565b600090815573ffffffffffffffffffffffffffffffffffffffff8316815260016020526040902054612f6090826130fb565b73ffffffffffffffffffffffffffffffffffffffff831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6000818310612fd45781612fd6565b825b9392505050565b73ffffffffffffffffffffffffffffffffffffffff821660009081526001602052604090205461300d90826126ef565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600160205260408120919091555461304190826126ef565b600090815560408051838152905173ffffffffffffffffffffffffffffffffffffffff8516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef919081900360200190a35050565b6dffffffffffffffffffffffffffff166e0100000000000000000000000000000290565b60006dffffffffffffffffffffffffffff82167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8416816130f357fe5b049392505050565b80820182811015610e3a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6164642d6f766572666c6f77000000000000000000000000604482015290519081900360640190fdfe4c697465723a20494e53554646494349454e545f4c49515549444954595f4d494e5445444c697465723a20494e53554646494349454e545f4f55545055545f414d4f554e544c697465723a20494e53554646494349454e545f4c49515549444954595f4255524e4544a2646970667358221220a48df719e5866120129228983fb2950d87a7b4d0bbb43104e892ac3ada4fed8d64736f6c634300060c0033a2646970667358221220b6ebd9a0173c38b93eb623195e378fd466048aee8073e1bee45cad44ab23f09b64736f6c634300060c0033";

export class UniswapV2Factory__factory extends ContractFactory {
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
    _feeToSetter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UniswapV2Factory> {
    return super.deploy(
      _feeToSetter,
      overrides || {}
    ) as Promise<UniswapV2Factory>;
  }
  getDeployTransaction(
    _feeToSetter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_feeToSetter, overrides || {});
  }
  attach(address: string): UniswapV2Factory {
    return super.attach(address) as UniswapV2Factory;
  }
  connect(signer: Signer): UniswapV2Factory__factory {
    return super.connect(signer) as UniswapV2Factory__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniswapV2FactoryInterface {
    return new utils.Interface(_abi) as UniswapV2FactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapV2Factory {
    return new Contract(address, _abi, signerOrProvider) as UniswapV2Factory;
  }
}

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
  "0x608060405234801561001057600080fd5b506040516140223803806140228339818101604052602081101561003357600080fd5b5051600380546001600160a01b0319166001600160a01b03909216919091179055613fbf806100636000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063574f2ba311610097578063aef99eb311610066578063aef99eb314610250578063c9c6539614610258578063e6a4390514610293578063f46901ed146102ce576100f5565b8063574f2ba3146101f35780637cd07e471461020d5780639aab924814610215578063a2e74af61461021d576100f5565b80631e3dd18b116100d35780631e3dd18b1461016857806323cf3118146101855780632d6ec309146101b857806342079671146101eb576100f5565b8063017e7e58146100fa57806308b60fb81461012b578063094b741514610160575b600080fd5b610102610301565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b61015e6004803603602081101561014157600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661031d565b005b6101026103ea565b6101026004803603602081101561017e57600080fd5b5035610406565b61015e6004803603602081101561019b57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661043a565b61015e600480360360208110156101ce57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610507565b6101026105d4565b6101fb6105f0565b60408051918252519081900360200190f35b6101026105f6565b6101fb610612565b61015e6004803603602081101561023357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610644565b610102610711565b6101026004803603604081101561026e57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602001351661072d565b610102600480360360408110156102a957600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020013516610b61565b61015e600480360360208110156102e457600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610b94565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60035473ffffffffffffffffffffffffffffffffffffffff1633146103a357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60035473ffffffffffffffffffffffffffffffffffffffff1681565b6006818154811061041357fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16905081565b60035473ffffffffffffffffffffffffffffffffffffffff1633146104c057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b600480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60035473ffffffffffffffffffffffffffffffffffffffff16331461058d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b60065490565b60045473ffffffffffffffffffffffffffffffffffffffff1681565b60006040518060200161062490610c61565b6020820181038252601f19601f8201166040525080519060200120905090565b60035473ffffffffffffffffffffffffffffffffffffffff1633146106ca57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b600380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60008173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156107ca57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f4c697465723a204944454e544943414c5f414444524553534553000000000000604482015290519081900360640190fd5b6000808373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161061080757838561080a565b84845b909250905073ffffffffffffffffffffffffffffffffffffffff821661089157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f4c697465723a205a45524f5f4144445245535300000000000000000000000000604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff82811660009081526005602090815260408083208585168452909152902054161561093257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f4c697465723a20504149525f4558495354530000000000000000000000000000604482015290519081900360640190fd5b60606040518060200161094490610c61565b6020820181038252601f19601f82011660405250905060008383604051602001808373ffffffffffffffffffffffffffffffffffffffff1660601b81526014018273ffffffffffffffffffffffffffffffffffffffff1660601b815260140192505050604051602081830303815290604052805190602001209050808251602084016000f594508473ffffffffffffffffffffffffffffffffffffffff1663485cc95585856040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b158015610a5257600080fd5b505af1158015610a66573d6000803e3d6000fd5b5050505073ffffffffffffffffffffffffffffffffffffffff84811660008181526005602081815260408084208987168086529083528185208054978d167fffffffffffffffffffffffff000000000000000000000000000000000000000098891681179091559383528185208686528352818520805488168517905560068054600181018255958190527ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f90950180549097168417909655925483519283529082015281517f0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9929181900390910190a35050505092915050565b600560209081526000928352604080842090915290825290205473ffffffffffffffffffffffffffffffffffffffff1681565b60035473ffffffffffffffffffffffffffffffffffffffff163314610c1a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4c697465723a20464f5242494444454e00000000000000000000000000000000604482015290519081900360640190fd5b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b61331b80610c6f8339019056fe60806040526001600c5534801561001557600080fd5b50604080518082018252601281527129ba30b73230b93210262a29102a37b5b2b760711b6020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527f75fa2f8697de6252934fe94c712e1e80d4ddffb3a3597ff43cf80c49389aa15c818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a0808301919091528351808303909101815260c09091019092528151910120600355600580546001600160a01b031916331790556007805461ffff60a01b191690556131fd8061011e6000396000f3fe608060405234801561001057600080fd5b50600436106101da5760003560e01c806361d027b311610104578063a9059cbb116100a2578063d21220a711610071578063d21220a714610632578063d505accf1461063a578063dd62ed3e14610698578063fff6cae9146106d3576101da565b8063a9059cbb146105b6578063ba9a7a56146105ef578063bc25cf77146105f7578063c45a01551461062a576101da565b80637464fc3d116100de5780637464fc3d146105275780637ecebe001461052f57806389afcb441461056257806395d89b41146105ae576101da565b806361d027b3146104b95780636a627842146104c157806370a08231146104f4576101da565b80631b4782d01161017c5780633644e5151161014b5780633644e51514610466578063485cc9551461046e5780635909c0d5146104a95780635a3d5493146104b1576101da565b80631b4782d0146103d657806323b872dd146103fd57806330adf81f14610440578063313ce56714610448576101da565b8063095ea7b3116101b8578063095ea7b3146103365780630dfe16811461038357806316f0115b146103b457806318160ddd146103bc576101da565b8063022c0d9f146101df57806306fdde031461027a5780630902f1ac146102f7575b600080fd5b610278600480360360808110156101f557600080fd5b81359160208101359173ffffffffffffffffffffffffffffffffffffffff604083013516919081019060808101606082013564010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b5090925090506106db565b005b610282610db1565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102bc5781810151838201526020016102a4565b50505050905090810190601f1680156102e95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102ff610dea565b604080516dffffffffffffffffffffffffffff948516815292909316602083015263ffffffff168183015290519081900360600190f35b61036f6004803603604081101561034c57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135610e3f565b604080519115158252519081900360200190f35b61038b610e56565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b61036f610e72565b6103c4610e94565b60408051918252519081900360200190f35b610278600480360360408110156103ec57600080fd5b508035151590602001351515610e9a565b61036f6004803603606081101561041357600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020810135909116906040013561108b565b6103c4611164565b610450611188565b6040805160ff9092168252519081900360200190f35b6103c461118d565b6102786004803603604081101561048457600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020013516611193565b6103c461126c565b6103c4611272565b61036f611278565b6103c4600480360360208110156104d757600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611299565b6103c46004803603602081101561050a57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661187d565b6103c461188f565b6103c46004803603602081101561054557600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611895565b6105956004803603602081101561057857600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166118a7565b6040805192835260208301919091528051918290030190f35b610282611d32565b61036f600480360360408110156105cc57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135611d6b565b6103c4611d78565b6102786004803603602081101561060d57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611d7e565b61038b611f6b565b61038b611f87565b610278600480360360e081101561065057600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135611fa3565b6103c4600480360360408110156106ae57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602001351661226f565b61027861228c565b600c5460011461074c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4c54523a204c4f434b4544000000000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c558415158061075f5750600084115b6107ca57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f4c54523a20494e53554646494349454e545f4f55545055545f414d4f554e5400604482015290519081900360640190fd5b6000806107d5610dea565b5091509150816dffffffffffffffffffffffffffff16871080156108085750806dffffffffffffffffffffffffffff1686105b61087357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f4c54523a20494e53554646494349454e545f4c49515549444954590000000000604482015290519081900360640190fd5b600654600754600091829173ffffffffffffffffffffffffffffffffffffffff9182169190811690891682148015906108d857508073ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff1614155b61094357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4c54523a20494e56414c49445f544f0000000000000000000000000000000000604482015290519081900360640190fd5b8a1561095457610954828a8d612472565b891561096557610965818a8c612472565b8615610a31578873ffffffffffffffffffffffffffffffffffffffff166310d1e85c338d8d8c8c6040518663ffffffff1660e01b8152600401808673ffffffffffffffffffffffffffffffffffffffff168152602001858152602001848152602001806020018281038252848482818152602001925080828437600081840152601f19601f8201169050808301925050509650505050505050600060405180830381600087803b158015610a1857600080fd5b505af1158015610a2c573d6000803e3d6000fd5b505050505b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8416916370a08231916024808301926020929190829003018186803b158015610a9d57600080fd5b505afa158015610ab1573d6000803e3d6000fd5b505050506040513d6020811015610ac757600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191955073ffffffffffffffffffffffffffffffffffffffff8316916370a0823191602480820192602092909190829003018186803b158015610b3957600080fd5b505afa158015610b4d573d6000803e3d6000fd5b505050506040513d6020811015610b6357600080fd5b5051925060009150506dffffffffffffffffffffffffffff85168a90038311610b8d576000610ba3565b89856dffffffffffffffffffffffffffff160383035b9050600089856dffffffffffffffffffffffffffff16038311610bc7576000610bdd565b89856dffffffffffffffffffffffffffff160383035b90506000821180610bee5750600081115b610c5957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f4c54523a20494e53554646494349454e545f494e5055545f414d4f554e540000604482015290519081900360640190fd5b6000610c7b610c6984600361267f565b610c75876103e861267f565b90612705565b90506000610c8d610c6984600361267f565b9050610cb9620f4240610cb36dffffffffffffffffffffffffffff8b8116908b1661267f565b9061267f565b610cc3838361267f565b1015610d3057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600660248201527f4c54523a204b0000000000000000000000000000000000000000000000000000604482015290519081900360640190fd5b5050610d3e84848888612777565b60408051838152602081018390528082018d9052606081018c9052905173ffffffffffffffffffffffffffffffffffffffff8b169133917fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d8229181900360800190a350506001600c55505050505050505050565b6040518060400160405280601281526020017f5374616e64617264204c545220546f6b656e000000000000000000000000000081525081565b6008546dffffffffffffffffffffffffffff808216926e0100000000000000000000000000008304909116917c0100000000000000000000000000000000000000000000000000000000900463ffffffff1690565b6000610e4c338484612a2d565b5060015b92915050565b60065473ffffffffffffffffffffffffffffffffffffffff1681565b6007547501000000000000000000000000000000000000000000900460ff1681565b60005481565b600554604080517f094b74150000000000000000000000000000000000000000000000000000000081529051339273ffffffffffffffffffffffffffffffffffffffff169163094b7415916004808301926020929190829003018186803b158015610f0457600080fd5b505afa158015610f18573d6000803e3d6000fd5b505050506040513d6020811015610f2e57600080fd5b505173ffffffffffffffffffffffffffffffffffffffff1614610fb257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4c54523a20464f5242494444454e000000000000000000000000000000000000604482015290519081900360640190fd5b6007805482151575010000000000000000000000000000000000000000009081027fffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffffff861515740100000000000000000000000000000000000000009081027fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff909516949094171617928390556040805192840460ff9081161515845291909304161515602082015281517ff6c1ff6d5faa01a8a20b9d6ae91346ce5a998b9633448f9d8b6e52ac98d18299929181900390910190a15050565b73ffffffffffffffffffffffffffffffffffffffff831660009081526002602090815260408083203384529091528120547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1461114f5773ffffffffffffffffffffffffffffffffffffffff8416600090815260026020908152604080832033845290915290205461111d9083612705565b73ffffffffffffffffffffffffffffffffffffffff851660009081526002602090815260408083203384529091529020555b61115a848484612a9c565b5060019392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601281565b60035481565b60055473ffffffffffffffffffffffffffffffffffffffff16331461121957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4c54523a20464f5242494444454e000000000000000000000000000000000000604482015290519081900360640190fd5b6006805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff00000000000000000000000000000000000000009182161790915560078054929093169116179055565b60095481565b600a5481565b60075474010000000000000000000000000000000000000000900460ff1681565b6000600c5460011461130c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4c54523a204c4f434b4544000000000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c8190558061131c610dea565b50600654604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905193955091935060009273ffffffffffffffffffffffffffffffffffffffff909116916370a08231916024808301926020929190829003018186803b15801561139657600080fd5b505afa1580156113aa573d6000803e3d6000fd5b505050506040513d60208110156113c057600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905192935060009273ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b15801561143957600080fd5b505afa15801561144d573d6000803e3d6000fd5b505050506040513d602081101561146357600080fd5b505190506000611483836dffffffffffffffffffffffffffff8716612705565b905060006114a1836dffffffffffffffffffffffffffff8716612705565b905060006114af8787612b71565b6000549091508061173457600554604080517f7cd07e47000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff1691637cd07e47916004808301926020929190829003018186803b15801561152557600080fd5b505afa158015611539573d6000803e3d6000fd5b505050506040513d602081101561154f57600080fd5b505190503373ffffffffffffffffffffffffffffffffffffffff82161415611684578073ffffffffffffffffffffffffffffffffffffffff166340dc0e376040518163ffffffff1660e01b815260040160206040518083038186803b1580156115b757600080fd5b505afa1580156115cb573d6000803e3d6000fd5b505050506040513d60208110156115e157600080fd5b50519950891580159061161457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8a14155b61167f57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f4261642064657369726564206c69717569646974790000000000000000000000604482015290519081900360640190fd5b61172e565b73ffffffffffffffffffffffffffffffffffffffff81161561170757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f4d757374206e6f742068617665206d69677261746f7200000000000000000000604482015290519081900360640190fd5b61171f6103e8610c7561171a888861267f565b612ee5565b995061172e60006103e8612f37565b50611785565b6117826dffffffffffffffffffffffffffff8916611752868461267f565b8161175957fe5b046dffffffffffffffffffffffffffff8916611775868561267f565b8161177c57fe5b04612fdb565b98505b600089116117de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806131a66022913960400191505060405180910390fd5b6117e88a8a612f37565b6117f486868a8a612777565b81156118305760085461182c906dffffffffffffffffffffffffffff808216916e01000000000000000000000000000090041661267f565b600b555b6040805185815260208101859052815133927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a250506001600c5550949695505050505050565b60016020526000908152604090205481565b600b5481565b60046020526000908152604090205481565b600080600c5460011461191b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4c54523a204c4f434b4544000000000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c8190558061192b610dea565b50600654600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905194965092945073ffffffffffffffffffffffffffffffffffffffff9182169391169160009184916370a08231916024808301926020929190829003018186803b1580156119ad57600080fd5b505afa1580156119c1573d6000803e3d6000fd5b505050506040513d60208110156119d757600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191925060009173ffffffffffffffffffffffffffffffffffffffff8516916370a08231916024808301926020929190829003018186803b158015611a4b57600080fd5b505afa158015611a5f573d6000803e3d6000fd5b505050506040513d6020811015611a7557600080fd5b505130600090815260016020526040812054919250611a948888612b71565b60005490915080611aa5848761267f565b81611aac57fe5b049a5080611aba848661267f565b81611ac157fe5b04995060008b118015611ad4575060008a115b611b29576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806131846022913960400191505060405180910390fd5b611b333084612ff3565b611b3e878d8d612472565b611b49868d8c612472565b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8916916370a08231916024808301926020929190829003018186803b158015611bb557600080fd5b505afa158015611bc9573d6000803e3d6000fd5b505050506040513d6020811015611bdf57600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191965073ffffffffffffffffffffffffffffffffffffffff8816916370a0823191602480820192602092909190829003018186803b158015611c5157600080fd5b505afa158015611c65573d6000803e3d6000fd5b505050506040513d6020811015611c7b57600080fd5b50519350611c8b85858b8b612777565b8115611cc757600854611cc3906dffffffffffffffffffffffffffff808216916e01000000000000000000000000000090041661267f565b600b555b604080518c8152602081018c9052815173ffffffffffffffffffffffffffffffffffffffff8f169233927fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496929081900390910190a35050505050505050506001600c81905550915091565b6040518060400160405280600381526020017f4c5452000000000000000000000000000000000000000000000000000000000081525081565b6000610e4c338484612a9c565b6103e881565b600c54600114611def57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4c54523a204c4f434b4544000000000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c55600654600754600854604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff9485169490931692611ec59285928792611ec0926dffffffffffffffffffffffffffff169185916370a0823191602480820192602092909190829003018186803b158015611e8e57600080fd5b505afa158015611ea2573d6000803e3d6000fd5b505050506040513d6020811015611eb857600080fd5b505190612705565b612472565b611f618184611ec06008600e9054906101000a90046dffffffffffffffffffffffffffff166dffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015611e8e57600080fd5b50506001600c5550565b60055473ffffffffffffffffffffffffffffffffffffffff1681565b60075473ffffffffffffffffffffffffffffffffffffffff1681565b4284101561201257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f556e697377617056323a20455850495245440000000000000000000000000000604482015290519081900360640190fd5b60035473ffffffffffffffffffffffffffffffffffffffff80891660008181526004602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958d166060860152608085018c905260a085019590955260c08085018b90528151808603909101815260e0850182528051908301207f19010000000000000000000000000000000000000000000000000000000000006101008601526101028501969096526101228085019690965280518085039096018652610142840180825286519683019690962095839052610162840180825286905260ff89166101828501526101a284018890526101c28401879052519193926101e2808201937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081019281900390910190855afa158015612173573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff8116158015906121ee57508873ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b61225957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f556e697377617056323a20494e56414c49445f5349474e415455524500000000604482015290519081900360640190fd5b612264898989612a2d565b505050505050505050565b600260209081526000928352604080842090915290825290205481565b600c546001146122fd57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f4c54523a204c4f434b4544000000000000000000000000000000000000000000604482015290519081900360640190fd5b6000600c55600654604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905161246b9273ffffffffffffffffffffffffffffffffffffffff16916370a08231916024808301926020929190829003018186803b15801561237457600080fd5b505afa158015612388573d6000803e3d6000fd5b505050506040513d602081101561239e57600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b15801561241157600080fd5b505afa158015612425573d6000803e3d6000fd5b505050506040513d602081101561243b57600080fd5b50516008546dffffffffffffffffffffffffffff808216916e010000000000000000000000000000900416612777565b6001600c55565b604080518082018252601981527f7472616e7366657228616464726573732c75696e743235362900000000000000602091820152815173ffffffffffffffffffffffffffffffffffffffff85811660248301526044808301869052845180840390910181526064909201845291810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001781529251815160009460609489169392918291908083835b6020831061257857805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0909201916020918201910161253b565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146125da576040519150601f19603f3d011682016040523d82523d6000602084013e6125df565b606091505b509150915081801561260d57508051158061260d575080806020019051602081101561260a57600080fd5b50515b61267857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f4c54523a205452414e534645525f4641494c4544000000000000000000000000604482015290519081900360640190fd5b5050505050565b600081158061269a5750508082028282828161269757fe5b04145b610e5057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6d756c2d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b80820382811115610e5057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f64732d6d6174682d7375622d756e646572666c6f770000000000000000000000604482015290519081900360640190fd5b6dffffffffffffffffffffffffffff84118015906127a357506dffffffffffffffffffffffffffff8311155b61280e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4c54523a204f564552464c4f5700000000000000000000000000000000000000604482015290519081900360640190fd5b60085463ffffffff428116917c01000000000000000000000000000000000000000000000000000000009004811682039081161580159061285e57506dffffffffffffffffffffffffffff841615155b801561287957506dffffffffffffffffffffffffffff831615155b15612923578063ffffffff166128b685612892866130ac565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16906130d0565b600980547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff929092169290920201905563ffffffff81166128f684612892876130ac565b600a80547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff92909216929092020190555b600880547fffffffffffffffffffffffffffffffffffff0000000000000000000000000000166dffffffffffffffffffffffffffff888116919091177fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff166e0100000000000000000000000000008883168102919091177bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167c010000000000000000000000000000000000000000000000000000000063ffffffff871602179283905560408051848416815291909304909116602082015281517f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1929181900390910190a1505050505050565b73ffffffffffffffffffffffffffffffffffffffff808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260016020526040902054612acc9082612705565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152600160205260408082209390935590841681522054612b089082613111565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b158015612bdc57600080fd5b505afa158015612bf0573d6000803e3d6000fd5b505050506040513d6020811015612c0657600080fd5b5051600554604080517faef99eb3000000000000000000000000000000000000000000000000000000008152905192935060009273ffffffffffffffffffffffffffffffffffffffff9092169163aef99eb391600480820192602092909190829003018186803b158015612c7957600080fd5b505afa158015612c8d573d6000803e3d6000fd5b505050506040513d6020811015612ca357600080fd5b5051600554604080517f42079671000000000000000000000000000000000000000000000000000000008152905192935060009273ffffffffffffffffffffffffffffffffffffffff90921691634207967191600480820192602092909190829003018186803b158015612d1657600080fd5b505afa158015612d2a573d6000803e3d6000fd5b505050506040513d6020811015612d4057600080fd5b505173ffffffffffffffffffffffffffffffffffffffff84811615159550909150600090831615801590612d8f57506007547501000000000000000000000000000000000000000000900460ff165b9050600073ffffffffffffffffffffffffffffffffffffffff831615801590612dd2575060075474010000000000000000000000000000000000000000900460ff165b600b549091508615612ecd578015612ec8576000612e0661171a6dffffffffffffffffffffffffffff8c8116908c1661267f565b90506000612e1383612ee5565b905080821115612ec5576000612e35612e2c8484612705565b6000549061267f565b90506000612e4e83612e4886600561267f565b90613111565b90506000818381612e5b57fe5b0490508015612ec1578715612eb7578615612e985760038104612e7e8b82612f37565b612e888c82612f37565b612e928a82612f37565b50612eb2565b60028104612ea68b82612f37565b612eb08c82612f37565b505b612ec1565b612ec18b82612f37565b5050505b50505b612ed9565b8015612ed9576000600b555b50505050505092915050565b60006003821115612f28575080600160028204015b81811015612f2257809150600281828581612f1157fe5b040181612f1a57fe5b049050612efa565b50612f32565b8115612f32575060015b919050565b600054612f449082613111565b600090815573ffffffffffffffffffffffffffffffffffffffff8316815260016020526040902054612f769082613111565b73ffffffffffffffffffffffffffffffffffffffff831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6000818310612fea5781612fec565b825b9392505050565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600160205260409020546130239082612705565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260016020526040812091909155546130579082612705565b600090815560408051838152905173ffffffffffffffffffffffffffffffffffffffff8516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef919081900360200190a35050565b6dffffffffffffffffffffffffffff166e0100000000000000000000000000000290565b60006dffffffffffffffffffffffffffff82167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff84168161310957fe5b049392505050565b80820182811015610e5057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6164642d6f766572666c6f77000000000000000000000000604482015290519081900360640190fdfe4c54523a20494e53554646494349454e545f4c49515549444954595f4255524e45444c54523a20494e53554646494349454e545f4c49515549444954595f4d494e544544a264697066735822122046a170b0a93442cdc99609fe884ca2fef6ed2600b78f33e4260f2f2c285826d064736f6c634300060c0033a26469706673582212207e825b4a1b929c9118f4b23cd62f7d8ebeb1885452f5d00d101fbf92ed48669664736f6c634300060c0033";

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

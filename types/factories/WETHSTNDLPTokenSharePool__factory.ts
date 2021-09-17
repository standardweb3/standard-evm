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
import type {
  WETHSTNDLPTokenSharePool,
  WETHSTNDLPTokenSharePoolInterface,
} from "../WETHSTNDLPTokenSharePool";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "stnd_",
        type: "address",
      },
      {
        internalType: "address",
        name: "lptoken_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "starttime_",
        type: "uint256",
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
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "RewardAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "RewardPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "DURATION",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "earned",
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
    name: "exit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initreward",
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
    name: "lastTimeRewardApplicable",
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
    name: "lastUpdateTime",
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
    name: "lpt",
    outputs: [
      {
        internalType: "contract IERC20",
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
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "notifyRewardAmount",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "periodFinish",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardDistribution",
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
    name: "rewardPerToken",
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
    name: "rewardPerTokenStored",
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
    name: "rewardRate",
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
        name: "",
        type: "address",
      },
    ],
    name: "rewards",
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
        name: "_rewardDistribution",
        type: "address",
      },
    ],
    name: "setRewardDistribution",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "starttime",
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
    name: "stnd",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalInput",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userRewardPerTokenPaid",
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
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "withdrawReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052693f870857a3e0e380000060075560006009556000600a553480156200002957600080fd5b50604051620017d8380380620017d88339810160408190526200004c916200010e565b62000057336200009f565b600580546001600160a01b039485166001600160a01b03199182161790915560008054939094169281169290921790925560089190915560068054909116331790556200014f565b600380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b03811681146200010957600080fd5b919050565b6000806000606084860312156200012457600080fd5b6200012f84620000f1565b92506200013f60208501620000f1565b9150604084015190509250925092565b611679806200015f6000396000f3fe608060405234801561001057600080fd5b50600436106101b85760003560e01c80638b876347116100f9578063c8f33c9111610097578063df136d6511610071578063df136d65146103b3578063e9fad8ee146103bc578063ebe2b12b146103c4578063f2fde38b146103cd57600080fd5b8063c8f33c9114610382578063cd3daf9d1461038b578063ce5fc8d01461039357600080fd5b806396735aa0116100d357806396735aa01461033e5780639c907b581461035e5780639e15bc2514610367578063a694fc3a1461036f57600080fd5b80638b876347146102f75780638da58897146103175780638da5cb5b1461032057600080fd5b80633c6b16ab1161016657806370a082311161014057806370a08231146102a8578063715018a6146102de5780637b0a47ee146102e657806380faa57d146102ef57600080fd5b80633c6b16ab1461027a5780633d18b9121461028d578063523a3f081461029557600080fd5b8063101114cf11610197578063101114cf146102185780631be052891461025d5780632e1a7d4d1461026757600080fd5b80628cc262146101bd5780630700037d146101e35780630d68b76114610203575b600080fd5b6101d06101cb366004611463565b6103e0565b6040519081526020015b60405180910390f35b6101d06101f1366004611463565b600e6020526000908152604090205481565b610216610211366004611463565b610479565b005b6004546102389073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101da565b6101d0624f1a0081565b6102166102753660046114bb565b610546565b6102166102883660046114bb565b6106d4565b6102166108e5565b6102166102a33660046114bb565b610a41565b6101d06102b6366004611463565b73ffffffffffffffffffffffffffffffffffffffff1660009081526002602052604090205490565b610216610ae9565b6101d0600a5481565b6101d0610b76565b6101d0610305366004611463565b600d6020526000908152604090205481565b6101d060085481565b60035473ffffffffffffffffffffffffffffffffffffffff16610238565b6005546102389073ffffffffffffffffffffffffffffffffffffffff1681565b6101d060075481565b6001546101d0565b61021661037d3660046114bb565b610b89565b6101d0600b5481565b6101d0610d0f565b6000546102389073ffffffffffffffffffffffffffffffffffffffff1681565b6101d0600c5481565b610216610d5d565b6101d060095481565b6102166103db366004611463565b610d7e565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600e6020908152604080832054600d909252822054610473919061046d90670de0b6b3a7640000906104679061043a90610434610d0f565b90610eab565b73ffffffffffffffffffffffffffffffffffffffff88166000908152600260205260409020545b90610ebe565b90610eca565b90610ed6565b92915050565b60035473ffffffffffffffffffffffffffffffffffffffff1633146104ff576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b600480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b3361054f610d0f565b600c5561055a610b76565b600b5573ffffffffffffffffffffffffffffffffffffffff8116156105bb57610582816103e0565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600e6020908152604080832093909355600c54600d909152919020555b600854421015610627576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f6e6f74207374617274000000000000000000000000000000000000000000000060448201526064016104f6565b60008211610691576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f43616e6e6f74207769746864726177203000000000000000000000000000000060448201526064016104f6565b61069a82610ee2565b60405182815233907f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5906020015b60405180910390a25050565b60035473ffffffffffffffffffffffffffffffffffffffff163314610755576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104f6565b600061075f610d0f565b600c5561076a610b76565b600b5573ffffffffffffffffffffffffffffffffffffffff8116156107cb57610792816103e0565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600e6020908152604080832093909355600c54600d909152919020555b6008544211156108835760095442106107f3576107eb82624f1a00610eca565b600a55610835565b6009546000906108039042610eab565b9050600061081c600a5483610ebe90919063ffffffff16565b905061082f624f1a006104678684610ed6565b600a5550505b42600b81905561084890624f1a00610ed6565b6009556040518281527fde88a922e0d3b88b24e9623efeb464919c6bf9f66857a65e2bfcf2ce87a9433d906020015b60405180910390a15050565b60075461089390624f1a00610eca565b600a55600854600b8190556108ab90624f1a00610ed6565b6009556007546040519081527fde88a922e0d3b88b24e9623efeb464919c6bf9f66857a65e2bfcf2ce87a9433d90602001610877565b5050565b336108ee610d0f565b600c556108f9610b76565b600b5573ffffffffffffffffffffffffffffffffffffffff81161561095a57610921816103e0565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600e6020908152604080832093909355600c54600d909152919020555b6008544210156109c6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f6e6f74207374617274000000000000000000000000000000000000000000000060448201526064016104f6565b60006109d1336103e0565b905080156108e157336000818152600e6020526040812055600554610a0f9173ffffffffffffffffffffffffffffffffffffffff9091169083610f40565b60405181815233907fe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486906020016106c8565b60065473ffffffffffffffffffffffffffffffffffffffff163314610ac2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4e6f7420746865206f70657261746f72206f662074686520706f6f6c0000000060448201526064016104f6565b600554610ae69073ffffffffffffffffffffffffffffffffffffffff163383610f40565b50565b60035473ffffffffffffffffffffffffffffffffffffffff163314610b6a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104f6565b610b746000611019565b565b6000610b8442600954611090565b905090565b33610b92610d0f565b600c55610b9d610b76565b600b5573ffffffffffffffffffffffffffffffffffffffff811615610bfe57610bc5816103e0565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600e6020908152604080832093909355600c54600d909152919020555b600854421015610c6a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f6e6f74207374617274000000000000000000000000000000000000000000000060448201526064016104f6565b60008211610cd4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f43616e6e6f74207374616b65203000000000000000000000000000000000000060448201526064016104f6565b610cdd826110a6565b60405182815233907f9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d906020016106c8565b6000610d1a60015490565b610d255750600c5490565b610b84610d54610d3460015490565b610467670de0b6b3a7640000610461600a54610461600b54610434610b76565b600c5490610ed6565b33600090815260026020526040902054610d7690610546565b610b746108e5565b60035473ffffffffffffffffffffffffffffffffffffffff163314610dff576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104f6565b73ffffffffffffffffffffffffffffffffffffffff8116610ea2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016104f6565b610ae681611019565b6000610eb782846115d1565b9392505050565b6000610eb78284611594565b6000610eb78284611559565b6000610eb78284611541565b600154610eef9082610eab565b60015533600090815260026020526040902054610f0c9082610eab565b336000818152600260205260408120929092559054610ae69173ffffffffffffffffffffffffffffffffffffffff90911690835b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526110149084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611109565b505050565b6003805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600081831061109f5781610eb7565b5090919050565b6001546110b39082610ed6565b600155336000908152600260205260409020546110d09082610ed6565b336000818152600260205260408120929092559054610ae69173ffffffffffffffffffffffffffffffffffffffff909116903084611215565b600061116b826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166112799092919063ffffffff16565b80519091501561101457808060200190518101906111899190611499565b611014576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016104f6565b60405173ffffffffffffffffffffffffffffffffffffffff808516602483015283166044820152606481018290526112739085907f23b872dd0000000000000000000000000000000000000000000000000000000090608401610f92565b50505050565b60606112888484600085611290565b949350505050565b606082471015611322576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c000000000000000000000000000000000000000000000000000060648201526084016104f6565b843b61138a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016104f6565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516113b391906114d4565b60006040518083038185875af1925050503d80600081146113f0576040519150601f19603f3d011682016040523d82523d6000602084013e6113f5565b606091505b5091509150611405828286611410565b979650505050505050565b6060831561141f575081610eb7565b82511561142f5782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104f691906114f0565b60006020828403121561147557600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114610eb757600080fd5b6000602082840312156114ab57600080fd5b81518015158114610eb757600080fd5b6000602082840312156114cd57600080fd5b5035919050565b600082516114e68184602087016115e8565b9190910192915050565b602081526000825180602084015261150f8160408501602087016115e8565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b6000821982111561155457611554611614565b500190565b60008261158f577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156115cc576115cc611614565b500290565b6000828210156115e3576115e3611614565b500390565b60005b838110156116035781810151838201526020016115eb565b838111156112735750506000910152565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea26469706673582212200ba09b6853323140acdad1738aa7126bad44d40ff5352e031ef3ac1251e1d93d64736f6c63430008070033";

export class WETHSTNDLPTokenSharePool__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    stnd_: string,
    lptoken_: string,
    starttime_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WETHSTNDLPTokenSharePool> {
    return super.deploy(
      stnd_,
      lptoken_,
      starttime_,
      overrides || {}
    ) as Promise<WETHSTNDLPTokenSharePool>;
  }
  getDeployTransaction(
    stnd_: string,
    lptoken_: string,
    starttime_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      stnd_,
      lptoken_,
      starttime_,
      overrides || {}
    );
  }
  attach(address: string): WETHSTNDLPTokenSharePool {
    return super.attach(address) as WETHSTNDLPTokenSharePool;
  }
  connect(signer: Signer): WETHSTNDLPTokenSharePool__factory {
    return super.connect(signer) as WETHSTNDLPTokenSharePool__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WETHSTNDLPTokenSharePoolInterface {
    return new utils.Interface(_abi) as WETHSTNDLPTokenSharePoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WETHSTNDLPTokenSharePool {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as WETHSTNDLPTokenSharePool;
  }
}

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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
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
];

const _bytecode =
  "0x6080604052693f870857a3e0e380000060075560006009556000600a553480156200002957600080fd5b5060405162001807380380620018078339810160408190526200004c916200010e565b62000057336200009f565b600580546001600160a01b039485166001600160a01b03199182161790915560008054939094169281169290921790925560089190915560068054909116331790556200014f565b600380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b03811681146200010957600080fd5b919050565b6000806000606084860312156200012457600080fd5b6200012f84620000f1565b92506200013f60208501620000f1565b9150604084015190509250925092565b6116a8806200015f6000396000f3fe608060405234801561001057600080fd5b50600436106101b85760003560e01c80638b876347116100f9578063c8f33c9111610097578063df136d6511610071578063df136d65146103b3578063e9fad8ee146103bc578063ebe2b12b146103c4578063f2fde38b146103cd57600080fd5b8063c8f33c9114610382578063cd3daf9d1461038b578063ce5fc8d01461039357600080fd5b806396735aa0116100d357806396735aa01461033e5780639c907b581461035e5780639e15bc2514610367578063a694fc3a1461036f57600080fd5b80638b876347146102f75780638da58897146103175780638da5cb5b1461032057600080fd5b80633c6b16ab1161016657806370a082311161014057806370a08231146102a8578063715018a6146102de5780637b0a47ee146102e657806380faa57d146102ef57600080fd5b80633c6b16ab1461027a5780633d18b9121461028d5780635312ea8e1461029557600080fd5b8063101114cf11610197578063101114cf146102185780631be052891461025d5780632e1a7d4d1461026757600080fd5b80628cc262146101bd5780630700037d146101e35780630d68b76114610203575b600080fd5b6101d06101cb366004611492565b6103e0565b6040519081526020015b60405180910390f35b6101d06101f1366004611492565b600e6020526000908152604090205481565b610216610211366004611492565b610479565b005b6004546102389073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101da565b6101d0624f1a0081565b6102166102753660046114ea565b610546565b6102166102883660046114ea565b6106d4565b610216610911565b6102166102a33660046114ea565b610a70565b6101d06102b6366004611492565b73ffffffffffffffffffffffffffffffffffffffff1660009081526002602052604090205490565b610216610b18565b6101d0600a5481565b6101d0610ba5565b6101d0610305366004611492565b600d6020526000908152604090205481565b6101d060085481565b60035473ffffffffffffffffffffffffffffffffffffffff16610238565b6005546102389073ffffffffffffffffffffffffffffffffffffffff1681565b6101d060075481565b6001546101d0565b61021661037d3660046114ea565b610bb8565b6101d0600b5481565b6101d0610d3e565b6000546102389073ffffffffffffffffffffffffffffffffffffffff1681565b6101d0600c5481565b610216610d8c565b6101d060095481565b6102166103db366004611492565b610dad565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600e6020908152604080832054600d909252822054610473919061046d90670de0b6b3a7640000906104679061043a90610434610d3e565b90610eda565b73ffffffffffffffffffffffffffffffffffffffff88166000908152600260205260409020545b90610eed565b90610ef9565b90610f05565b92915050565b60035473ffffffffffffffffffffffffffffffffffffffff1633146104ff576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b600480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b3361054f610d3e565b600c5561055a610ba5565b600b5573ffffffffffffffffffffffffffffffffffffffff8116156105bb57610582816103e0565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600e6020908152604080832093909355600c54600d909152919020555b600854421015610627576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f6e6f74207374617274000000000000000000000000000000000000000000000060448201526064016104f6565b60008211610691576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f43616e6e6f74207769746864726177203000000000000000000000000000000060448201526064016104f6565b61069a82610f11565b60405182815233907f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5906020015b60405180910390a25050565b60035473ffffffffffffffffffffffffffffffffffffffff163314610755576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104f6565b600061075f610d3e565b600c5561076a610ba5565b600b5573ffffffffffffffffffffffffffffffffffffffff8116156107cb57610792816103e0565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600e6020908152604080832093909355600c54600d909152919020555b6008544211156108835760095442106107f3576107eb82624f1a00610ef9565b600a55610835565b6009546000906108039042610eda565b9050600061081c600a5483610eed90919063ffffffff16565b905061082f624f1a006104678684610f05565b600a5550505b42600b81905561084890624f1a00610f05565b6009556040518281527fde88a922e0d3b88b24e9623efeb464919c6bf9f66857a65e2bfcf2ce87a9433d906020015b60405180910390a15050565b60075461089390624f1a00610ef9565b600a55600854600b8190556108ab90624f1a00610f05565b600955306000908152600260205260409020546108cc90624f1a0090610467565b600a5411156108da57600080fd5b7fde88a922e0d3b88b24e9623efeb464919c6bf9f66857a65e2bfcf2ce87a9433d60075460405161087791815260200190565b5050565b3361091a610d3e565b600c55610925610ba5565b600b5573ffffffffffffffffffffffffffffffffffffffff8116156109865761094d816103e0565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600e6020908152604080832093909355600c54600d909152919020555b6008544210156109f2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f6e6f74207374617274000000000000000000000000000000000000000000000060448201526064016104f6565b336000908152600e6020526040902054801561090d57336000818152600e6020526040812055600554610a3e9173ffffffffffffffffffffffffffffffffffffffff9091169083610f6f565b60405181815233907fe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486906020016106c8565b60065473ffffffffffffffffffffffffffffffffffffffff163314610af1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f4e6f7420746865206f70657261746f72206f662074686520706f6f6c0000000060448201526064016104f6565b600554610b159073ffffffffffffffffffffffffffffffffffffffff163383610f6f565b50565b60035473ffffffffffffffffffffffffffffffffffffffff163314610b99576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104f6565b610ba36000611048565b565b6000610bb3426009546110bf565b905090565b33610bc1610d3e565b600c55610bcc610ba5565b600b5573ffffffffffffffffffffffffffffffffffffffff811615610c2d57610bf4816103e0565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600e6020908152604080832093909355600c54600d909152919020555b600854421015610c99576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f6e6f74207374617274000000000000000000000000000000000000000000000060448201526064016104f6565b60008211610d03576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f43616e6e6f74207374616b65203000000000000000000000000000000000000060448201526064016104f6565b610d0c826110d5565b60405182815233907f9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d906020016106c8565b6000610d4960015490565b610d545750600c5490565b610bb3610d83610d6360015490565b610467670de0b6b3a7640000610461600a54610461600b54610434610ba5565b600c5490610f05565b33600090815260026020526040902054610da590610546565b610ba3610911565b60035473ffffffffffffffffffffffffffffffffffffffff163314610e2e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104f6565b73ffffffffffffffffffffffffffffffffffffffff8116610ed1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016104f6565b610b1581611048565b6000610ee68284611600565b9392505050565b6000610ee682846115c3565b6000610ee68284611588565b6000610ee68284611570565b600154610f1e9082610eda565b60015533600090815260026020526040902054610f3b9082610eda565b336000818152600260205260408120929092559054610b159173ffffffffffffffffffffffffffffffffffffffff90911690835b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526110439084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611138565b505050565b6003805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60008183106110ce5781610ee6565b5090919050565b6001546110e29082610f05565b600155336000908152600260205260409020546110ff9082610f05565b336000818152600260205260408120929092559054610b159173ffffffffffffffffffffffffffffffffffffffff909116903084611244565b600061119a826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166112a89092919063ffffffff16565b80519091501561104357808060200190518101906111b891906114c8565b611043576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f7420737563636565640000000000000000000000000000000000000000000060648201526084016104f6565b60405173ffffffffffffffffffffffffffffffffffffffff808516602483015283166044820152606481018290526112a29085907f23b872dd0000000000000000000000000000000000000000000000000000000090608401610fc1565b50505050565b60606112b784846000856112bf565b949350505050565b606082471015611351576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c000000000000000000000000000000000000000000000000000060648201526084016104f6565b843b6113b9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016104f6565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516113e29190611503565b60006040518083038185875af1925050503d806000811461141f576040519150601f19603f3d011682016040523d82523d6000602084013e611424565b606091505b509150915061143482828661143f565b979650505050505050565b6060831561144e575081610ee6565b82511561145e5782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104f6919061151f565b6000602082840312156114a457600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114610ee657600080fd5b6000602082840312156114da57600080fd5b81518015158114610ee657600080fd5b6000602082840312156114fc57600080fd5b5035919050565b60008251611515818460208701611617565b9190910192915050565b602081526000825180602084015261153e816040850160208701611617565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b6000821982111561158357611583611643565b500190565b6000826115be577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156115fb576115fb611643565b500290565b60008282101561161257611612611643565b500390565b60005b8381101561163257818101518382015260200161161a565b838111156112a25750506000910152565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220abd90563c6817bb0a0c6bd9e31f493f64af5814a814d93d2e7acd4712d565ad264736f6c63430008070033";

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

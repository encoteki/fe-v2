export const tsbhub_abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_paymentToken',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const

export const tsbsatellite_abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_paymentToken',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
] as const

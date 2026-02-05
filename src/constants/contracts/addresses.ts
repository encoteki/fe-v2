import { Abi, Address } from 'viem'
import { CHAIN_IDS } from './payments'
import { tsbhub_abi, tsbsatellite_abi } from '@/constants/contracts/abi'

export const TSB_CONTRACTS: Record<number, Address> = {
  [CHAIN_IDS.BASE.SEPOLIA]: process.env
    .NEXT_PUBLIC_TSB_BASE_CONTRACT as Address,
  [CHAIN_IDS.ARBITRUM.SEPOLIA]: process.env
    .NEXT_PUBLIC_TSB_ARBITRUM_CONTRACT as Address,

  // [CHAIN_IDS.LISK.MAINNET]: '0xLiskMainnetContractAddress',
  // [CHAIN_IDS.MANTA.PACIFIC]: '0xMantaPacificContractAddress',
}

export const TSB_ABI: Record<any, Abi> = {
  [CHAIN_IDS.BASE.SEPOLIA]: tsbhub_abi,
  [CHAIN_IDS.ARBITRUM.SEPOLIA]: tsbsatellite_abi,
}

export const blockExplorerBaseUrls: Record<number, string> = {
  [CHAIN_IDS.BASE.SEPOLIA]: 'https://sepolia.basescan.org/tx/',
  [CHAIN_IDS.ARBITRUM.SEPOLIA]: 'https://sepolia.arbiscan.io/tx/',
}

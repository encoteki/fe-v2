import { StaticImageData } from 'next/image'

import ETHIcon from '@/shared/assets/icons/tokens/eth.webp'
import IDRXIcon from '@/shared/assets/icons/tokens/idrx.webp'
import LSKIcon from '@/shared/assets/icons/tokens/lisk.webp'
import USDCIcon from '@/shared/assets/icons/tokens/usdc.png'
import USDTIcon from '@/shared/assets/icons/tokens/tether.svg'
import ARBIcon from '@/shared/assets/icons/tokens/arb.svg'
import MANTAIcon from '@/shared/assets/icons/tokens/manta.png'
import { CONTRACT_ADDRESSES } from './addresses'
import { Hex } from 'viem'

export interface Token {
  symbol: string
  name: string
  decimals: number
  logo: StaticImageData
  cost: number
  address: Hex
  isNative?: boolean
}

export type TokenMetadata = Omit<Token, 'address'>

export const ETH: TokenMetadata = {
  symbol: 'ETH',
  name: 'ETH',
  decimals: 18,
  logo: ETHIcon,
  cost: 0.01,
  isNative: true,
}

export const LSK: TokenMetadata = {
  symbol: 'LSK',
  name: 'LSK',
  decimals: 18,
  logo: LSKIcon,
  cost: 40,
  isNative: false,
}

export const ARB: TokenMetadata = {
  symbol: 'ARB',
  name: 'ARB',
  decimals: 18,
  logo: ARBIcon,
  cost: 5,
  isNative: false,
}

export const MANTA: TokenMetadata = {
  symbol: 'MANTA',
  name: 'MANTA',
  decimals: 18,
  logo: MANTAIcon,
  cost: 300,
  isNative: false,
}

export const USDC: TokenMetadata = {
  symbol: 'USDC',
  name: 'USDC',
  decimals: 6,
  logo: USDCIcon,
  cost: 20,
  isNative: false,
}

export const USDT: TokenMetadata = {
  symbol: 'USDT',
  name: 'USDT',
  decimals: 6,
  logo: USDTIcon,
  cost: 20,
  isNative: false,
}

export const IDRX: TokenMetadata = {
  symbol: 'IDRX',
  name: 'IDRX',
  decimals: 2,
  logo: IDRXIcon,
  cost: 300000,
  isNative: false,
}

export const createToken = (meta: TokenMetadata, chainId: number): Token => {
  const addressesOnChain = CONTRACT_ADDRESSES[chainId]

  const address =
    addressesOnChain?.[meta.symbol] ||
    '0x0000000000000000000000000000000000000000'

  return {
    ...meta,
    address: address as Hex,
  }
}

export const PAYMENT_METHODS_MAP: Record<number, Token[]> = {
  // -------------------------
  // 🔵 BASE
  // -------------------------
  84532: [
    createToken(ETH, 84532),
    createToken(USDC, 84532),
    createToken(USDT, 84532),
    createToken(IDRX, 84532),
  ],
  8453: [
    createToken(ETH, 8453),
    createToken(USDC, 8453),
    createToken(USDT, 8453),
    createToken(IDRX, 8453),
  ],

  // -------------------------
  // 🟣 LISK
  // -------------------------
  4202: [
    createToken(ETH, 4202),
    createToken(LSK, 4202),
    createToken(USDT, 4202),
    createToken(IDRX, 4202),
  ],
  1135: [
    createToken(ETH, 1135),
    createToken(LSK, 1135),
    createToken(USDT, 1135),
    createToken(IDRX, 1135),
  ],

  // -------------------------
  // 🔴 ARBITRUM
  // -------------------------
  421614: [
    createToken(ETH, 421614),
    createToken(ARB, 421614),
    createToken(USDC, 421614),
    createToken(USDT, 421614),
  ],
  42161: [
    createToken(ETH, 42161),
    createToken(ARB, 42161),
    createToken(USDC, 42161),
    createToken(USDT, 42161),
  ],

  // -------------------------
  // 🔵 MANTA
  // -------------------------
  3441006: [
    createToken(ETH, 3441006),
    createToken(MANTA, 3441006),
    createToken(USDC, 3441006),
    createToken(USDT, 3441006),
  ],
  169: [
    createToken(ETH, 169),
    createToken(MANTA, 169),
    createToken(USDC, 169),
    createToken(USDT, 169),
  ],
}

export const getPaymentMethods = (chainId: number) =>
  PAYMENT_METHODS_MAP[chainId] || []

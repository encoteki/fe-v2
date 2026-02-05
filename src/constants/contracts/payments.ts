import { StaticImageData } from 'next/image'
import { Address, Hex } from 'viem'

// Assets
import ETHIcon from '@/assets/icons/tokens/eth.webp'
import IDRXIcon from '@/assets/icons/tokens/idrx.webp'
import LSKIcon from '@/assets/icons/tokens/lisk.webp'
import USDCIcon from '@/assets/icons/tokens/usdc.png'
import USDTIcon from '@/assets/icons/tokens/tether.svg'
import ARBIcon from '@/assets/icons/tokens/arb.svg'
import MANTAIcon from '@/assets/icons/tokens/manta.png'

export const CHAIN_IDS = {
  BASE: {
    MAINNET: 8453,
    SEPOLIA: 84532,
  },
  LISK: {
    MAINNET: 1135,
    SEPOLIA: 4202,
  },
  ARBITRUM: {
    ONE: 42161,
    SEPOLIA: 421614,
  },
  MANTA: {
    PACIFIC: 169,
    TESTNET: 3441006,
  },
} as const

// ============================================
// 1. TYPE DEFINITIONS
// ============================================

export type TokenSymbol =
  | 'ETH'
  | 'USDC'
  | 'USDT'
  | 'IDRX'
  | 'LSK'
  | 'ARB'
  | 'MANTA'

// Static data (Name, Logo, Decimals)
export interface TokenMetadata {
  symbol: TokenSymbol
  name: string
  decimals: number
  logo: StaticImageData
  isNative?: boolean
}

// Full object used by UI (includes Cost + Chain Data)
export interface Token extends TokenMetadata {
  cost: number
  address: Hex
  chainId: number
}

// ============================================
// 2. PRICING CONFIGURATION (BUSINESS LOGIC)
// ============================================

/**
 * Manage all minting costs here.
 * Easy to read and update without touching code logic.
 */
export const MINT_PRICES: Record<TokenSymbol, number> = {
  ETH: 0.0001,
  LSK: 40,
  ARB: 5,
  MANTA: 300,
  USDC: 1,
  USDT: 1,
  IDRX: 300000,
}

// ============================================
// 3. STATIC METADATA (IMMUTABLE)
// ============================================

const TOKENS_META: Record<TokenSymbol, TokenMetadata> = {
  ETH: {
    symbol: 'ETH',
    name: 'Ether',
    decimals: 18,
    logo: ETHIcon,
    isNative: true,
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logo: USDCIcon,
    isNative: false,
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    logo: USDTIcon,
    isNative: false,
  },
  IDRX: {
    symbol: 'IDRX',
    name: 'IDR Token',
    decimals: 2,
    logo: IDRXIcon,
    isNative: false,
  },
  LSK: {
    symbol: 'LSK',
    name: 'Lisk',
    decimals: 18,
    logo: LSKIcon,
    isNative: false,
  },
  ARB: {
    symbol: 'ARB',
    name: 'Arbitrum',
    decimals: 18,
    logo: ARBIcon,
    isNative: false,
  },
  MANTA: {
    symbol: 'MANTA',
    name: 'Manta Token',
    decimals: 18,
    logo: MANTAIcon,
    isNative: false,
  },
}

// ============================================
// 4. ADDRESS REGISTRY
// ============================================

const ZERO_ADDRESS: Hex = '0x0000000000000000000000000000000000000000'

const ADDRESS_BOOK: Record<number, Partial<Record<TokenSymbol, Address>>> = {
  // --- BASE ---
  [CHAIN_IDS.BASE.SEPOLIA]: {
    ETH: ZERO_ADDRESS,
    USDC: process.env.NEXT_PUBLIC_BASE_USDC_ADDRESS as Address,
    USDT: '0x0',
    IDRX: '0x0',
  },
  [CHAIN_IDS.BASE.MAINNET]: {
    ETH: ZERO_ADDRESS,
    USDC: '0x0',
    USDT: '0x0',
    IDRX: '0x0',
  },

  // --- ARBITRUM ---
  [CHAIN_IDS.ARBITRUM.SEPOLIA]: {
    ETH: ZERO_ADDRESS,
    ARB: '0x2F6EBFeA38047B8bBD8f9D689730F0889Bd6f13a',
    USDC: process.env.NEXT_PUBLIC_ARBITRUM_USDC_ADDRESS as Address,
    USDT: '0x0',
  },
  [CHAIN_IDS.ARBITRUM.ONE]: {
    ETH: ZERO_ADDRESS,
    ARB: '0x0',
    USDC: '0x0',
    USDT: '0x0',
  },

  // --- LISK ---
  [CHAIN_IDS.LISK.SEPOLIA]: {
    ETH: ZERO_ADDRESS,
    LSK: '0x0',
    USDT: '0x0',
    IDRX: '0x0',
  },
  [CHAIN_IDS.LISK.MAINNET]: {
    ETH: ZERO_ADDRESS,
    LSK: '0x0',
    USDT: '0x0',
    IDRX: '0x0',
  },

  // --- MANTA ---
  [CHAIN_IDS.MANTA.TESTNET]: {
    ETH: ZERO_ADDRESS,
    MANTA: '0x0',
    USDC: '0x0',
    USDT: '0x0',
  },
  [CHAIN_IDS.MANTA.PACIFIC]: {
    ETH: ZERO_ADDRESS,
    MANTA: '0x0',
    USDC: '0x0',
    USDT: '0x0',
  },
}

// ============================================
// 5. CONFIGURATION
// ============================================

const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'development'
const IS_PRODUCTION = APP_ENV === 'production'

const NETWORKS = [
  {
    key: 'BASE',
    mainnet: CHAIN_IDS.BASE.MAINNET,
    testnet: CHAIN_IDS.BASE.SEPOLIA,
    tokens: ['ETH', 'USDC'] as TokenSymbol[],
  },
  {
    key: 'LISK',
    mainnet: CHAIN_IDS.LISK.MAINNET,
    testnet: CHAIN_IDS.LISK.SEPOLIA,
    tokens: ['ETH', 'LSK'] as TokenSymbol[],
  },
  {
    key: 'ARBITRUM',
    mainnet: CHAIN_IDS.ARBITRUM.ONE,
    testnet: CHAIN_IDS.ARBITRUM.SEPOLIA,
    tokens: ['ETH', 'USDC'] as TokenSymbol[],
  },
  {
    key: 'MANTA',
    mainnet: CHAIN_IDS.MANTA.PACIFIC,
    testnet: CHAIN_IDS.MANTA.TESTNET,
    tokens: ['ETH', 'MANTA'] as TokenSymbol[],
  },
]

// ============================================
// 6. GENERATOR LOGIC
// ============================================

export const PAYMENT_METHODS_MAP: Record<number, Token[]> = NETWORKS.reduce(
  (acc, network) => {
    const activeChainId = IS_PRODUCTION ? network.mainnet : network.testnet

    const chainTokens = network.tokens.map((symbol) => {
      const meta = TOKENS_META[symbol]
      const price = MINT_PRICES[symbol] // Fetch price from config
      const address = ADDRESS_BOOK[activeChainId]?.[symbol]

      if (!address && !IS_PRODUCTION) {
        console.warn(
          `[PaymentConfig] Missing address for ${symbol} on chain ${activeChainId}`,
        )
      }

      return {
        ...meta,
        cost: price,
        chainId: activeChainId,
        address: address || ZERO_ADDRESS,
      }
    })

    acc[activeChainId] = chainTokens
    return acc
  },
  {} as Record<number, Token[]>,
)

export const getPaymentMethods = (chainId: number): Token[] =>
  PAYMENT_METHODS_MAP[chainId] || []

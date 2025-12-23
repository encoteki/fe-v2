// 1. Ambil status environment dari .env
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'development'
export const IS_PRODUCTION = APP_ENV === 'production'

// 2. Definisi Chain ID untuk Development (Testnet)
const CHAINS_DEV = {
  BASE: 84532, // Base Sepolia
  LISK: 4202, // Lisk Sepolia (L2)
  MANTA: 3441006, // Manta Pacific Sepolia
  ARBITRUM: 421614, // Arbitrum Sepolia
} as const

// 3. Definisi Chain ID untuk Production (Mainnet)
const CHAINS_PROD = {
  BASE: 8453, // Base Mainnet
  LISK: 1135, // Lisk Mainnet (L2)
  MANTA: 169, // Manta Pacific Mainnet
  ARBITRUM: 42161, // Arbitrum One
} as const

// 4. Export variable dinamis yang akan berubah otomatis
export const CHAIN_IDS = IS_PRODUCTION ? CHAINS_PROD : CHAINS_DEV

// Opsional: Export nama jaringan untuk UI (Label)
export const NETWORK_LABELS = {
  [CHAIN_IDS.BASE]: IS_PRODUCTION ? 'Base' : 'Base Sepolia',
  [CHAIN_IDS.LISK]: IS_PRODUCTION ? 'Lisk' : 'Lisk Sepolia',
  [CHAIN_IDS.MANTA]: IS_PRODUCTION
    ? 'Manta Pacific'
    : 'Manta Pacific Sepolia Testnet',
  [CHAIN_IDS.ARBITRUM]: IS_PRODUCTION ? 'Arbitrum One' : 'Arbitrum Sepolia',
}

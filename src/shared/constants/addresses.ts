const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

type AddressMap = {
  [symbol: string]: `0x${string}`
}

export const CONTRACT_ADDRESSES: Record<number, AddressMap> = {
  // ============================================
  // 🔵 BASE
  // ============================================
  // Base Sepolia (DEV)
  84532: {
    ETH: ZERO_ADDRESS,
    USDC: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661', // Faucet USDC Base Sepolia
    USDT: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661',
    IDRX: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661',
  },
  // Base Mainnet (PROD)
  8453: {
    ETH: ZERO_ADDRESS,
    USDC: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661', // Official Base USDC
    USDT: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661',
    IDRX: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661', // Ganti address asli
  },

  // ============================================
  // 🟣 LISK (L2)
  // ============================================
  // Lisk Sepolia (DEV)
  4202: {
    ETH: ZERO_ADDRESS, // Lisk pakai ETH buat gas
    LSK: '0x0000000000000000000000000000000000000000', // Jika LSK ada sebagai ERC20
    USDT: '0x0000000000000000000000000000000000000000',
    IDRX: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661',
  },
  // Lisk Mainnet (PROD)
  1135: {
    ETH: ZERO_ADDRESS,
    LSK: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661', // Asumsi LSK native, kalau ERC20 ganti addressnya
    USDT: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661',
    IDRX: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661',
  },

  // ============================================
  // 🔴 ARBITRUM
  // ============================================
  // Arbitrum Sepolia (DEV)
  421614: {
    ETH: ZERO_ADDRESS,
    ARB: '0x...AddressARBDev...',
    USDC: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661',
    USDT: '0x...AddressUSDTDev...',
  },
  // Arbitrum One (PROD)
  42161: {
    ETH: ZERO_ADDRESS,
    ARB: '0x912CE59144191C1204E64559FE8253a0e49E6548', // Official ARB Token
    USDC: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // Official Arbitrum USDC
    USDT: '0xfd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  },

  // ============================================
  // 🔰 MANTA PACIFIC
  // ============================================
  // Manta Pacific Sepolia (DEV)
  3441006: {
    ETH: ZERO_ADDRESS,
    MANTA: '0x...AddressMANTADev...',
    USDC: '0x...AddressUSDCDev...',
    USDT: '0x...AddressUSDTDev...',
  },
  // Manta Pacific Mainnet (PROD)
  169: {
    ETH: ZERO_ADDRESS,
    MANTA: '0x...AddressMANTAProd...',
    USDC: '0x...AddressUSDCProd...',
    USDT: '0x...AddressUSDTProd...',
  },
}

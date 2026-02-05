import { formatUnits } from 'viem'

/**
 * Format BigInt ke string Rupiah atau Crypto
 * @param value Balance dalam BigInt
 * @param decimals Decimals token (e.g. 18 or 6)
 * @param symbol Symbol token untuk logika khusus (IDRX)
 * @param isNative Apakah ini native token (ETH/MATIC/BNB)
 */
export const formatBalance = (
  value: bigint,
  decimals: number,
  symbol: string,
  isNative: boolean = false,
): string => {
  if (!value) return '0'

  const floatValue = parseFloat(formatUnits(value, decimals))

  // 1. Case IDRX (Rupiah)
  if (symbol === 'IDRX') {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(floatValue)
  }

  // 2. Case Native (3 desimal)
  if (isNative) {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(floatValue)
  }

  // 3. Case Default ERC20 (2 desimal)
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(floatValue)
}

export const formatIDR = (value: number): string => {
  if (!value) return '0'

  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

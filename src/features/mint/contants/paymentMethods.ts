import ETH from '@/features/mint/assets/eth.webp'
import IDRX from '@/features/mint/assets/idrx.webp'
import LSK from '@/features/mint/assets/lisk.webp'
import USDC from '@/features/mint/assets/usdc.png'
import { StaticImageData } from 'next/image'

export interface PaymentMethod {
  name: string
  icon: StaticImageData
  color: string
  cost: string
}

export const PAYMENT_ETH: PaymentMethod = {
  name: 'ETH',
  icon: ETH,
  color: 'bg-gray-100',
  cost: '0.01',
}

export const PAYMENT_LSK: PaymentMethod = {
  name: 'LSK',
  icon: LSK,
  color: 'bg-black/10',
  cost: '0.001',
}

export const PAYMENT_USDC: PaymentMethod = {
  name: 'USDC',
  icon: USDC,
  color: 'bg-primary-blue/5',
  cost: '30',
}

export const PAYMENT_IDRX: PaymentMethod = {
  name: 'IDRX',
  icon: IDRX,
  color: 'bg-primary-blue/7',
  cost: '350.000',
}

'use client'

import SelectPaymentMethod from '@/features/mint/components/SelectPaymentMethod'
import TransactionStatus from '@/features/mint/components/TransactionStatus'
import { useMintCtx } from '@/features/mint/context/MintContext'

export default function MintPage() {
  const { isOnTx } = useMintCtx()

  return (
    <main className="app-container">
      {isOnTx ? <TransactionStatus /> : <SelectPaymentMethod />}
    </main>
  )
}

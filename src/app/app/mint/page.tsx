'use client'

import SelectPaymentMethod from '@/features/mint/components/SelectPaymentMethod'
import TransactionStatus from '@/features/mint/components/TransactionStatus'
import { useMintCtx } from '@/features/mint/context/MintContext'

export default function MintPage() {
  const { status } = useMintCtx()

  return (
    <main className="mint-container">
      <section className="mint-modal">
        {!status ? (
          <SelectPaymentMethod />
        ) : (
          <TransactionStatus status={status} />
        )}
      </section>
    </main>
  )
}

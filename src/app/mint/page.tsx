'use client'

import ReviewTransaction from '@/features/mint/components/ReviewTransaction'
import SelectPaymentMethod from '@/features/mint/components/SelectPaymentMethod'
import TransactionStatus from '@/features/mint/components/TransactionStatus'
import { useMintCtx } from '@/features/mint/context/MintContext'

export default function MintPage() {
  const { paymentMethod, status } = useMintCtx()

  return (
    <main className="mint-container">
      <section className="mint-modal">
        {!status ? (
          !paymentMethod ? (
            <SelectPaymentMethod />
          ) : (
            <ReviewTransaction />
          )
        ) : (
          <TransactionStatus status={status} />
        )}
      </section>
    </main>
  )
}

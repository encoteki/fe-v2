'use client'

import ReviewTransaction from '@/features/mint/components/ReviewTransaction'
import SelectPaymentMethod from '@/features/mint/components/SelectPaymentMethod'
import TransactionStatus from '@/features/mint/components/TransactionStatus'
import { MintStatus } from '@/features/mint/contants/MintEnum'
import { useMintCtx } from '@/features/mint/context/MintContext'

export default function MintPage() {
  const { status } = useMintCtx()

  return (
    <main className="mint-container">
      <section className="mint-modal">
        {status === MintStatus.HOME && <SelectPaymentMethod />}
        {status === MintStatus.REVIEW && <ReviewTransaction />}
        {status === MintStatus.SUCCESS && (
          <TransactionStatus status={MintStatus.SUCCESS} />
        )}
      </section>
    </main>
  )
}

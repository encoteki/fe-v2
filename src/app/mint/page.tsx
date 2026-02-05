'use client'

import ReviewTransaction from '@/components/mint/review-transaction'
import SelectPaymentMethod from '@/components/mint/select-payment-method'
import TransactionStatus from '@/components/mint/transaction-status'
import { MintStatus } from '@/enums/mint.enum'
import { useMintCtx } from '@/contexts/mint.context'

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

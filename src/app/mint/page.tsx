'use client'

import ReviewTransaction from '@/features/mint/components/ReviewTransaction'
import SelectPaymentMethod from '@/features/mint/components/SelectPaymentMethod'
import { MintStatus } from '@/features/mint/contants/MintEnum'
import { useMintCtx } from '@/features/mint/context/MintContext'
import { useEffect } from 'react'
import { useConnection } from 'wagmi'

export default function MintPage() {
  const { status } = useMintCtx()

  // Wagmi hooks
  const { connector } = useConnection()

  // Check connector
  useEffect(() => {
    if (connector) {
      console.log('ID:', connector.id)
      console.log('Name:', connector.name)
    }
  }, [connector])

  return (
    <main className="mint-container">
      <section className="mint-modal">
        {status === MintStatus.HOME && <SelectPaymentMethod />}
        {status === MintStatus.REVIEW && <ReviewTransaction />}
      </section>
    </main>
  )
}

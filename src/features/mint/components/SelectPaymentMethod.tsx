'use client'

import { useEffect, useState } from 'react'
import { useChainId } from 'wagmi'
import DefaultButton from '@/shared/ui/buttons/DefaultButton'
import { useMintCtx } from '../context/MintContext'
import { getPaymentMethods, Token } from '@/shared/constants/payments'
import { PaymentCard } from './PaymentCard'
import { Skeleton } from '@/shared/ui/Skeleton'
import { CHAIN_IDS } from '@/shared/constants/networks'

export default function SelectPaymentMethod() {
  const [loading, setLoading] = useState<boolean>(true)
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [paymentMethods, setPaymentMethods] = useState<Token[]>(
    getPaymentMethods(CHAIN_IDS.BASE),
  )

  const chainId = useChainId()
  useEffect(() => {
    setLoading(true)

    const methods = getPaymentMethods(chainId)
    setPaymentMethods(methods)
    setActiveIdx(0)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [chainId])

  const { setPaymentMethod } = useMintCtx()

  const onClickMint = () => {
    setPaymentMethod(paymentMethods[activeIdx])
  }

  return (
    <>
      <div className="mb-4 text-left">
        <h3 className="font-medium">Payment methods</h3>
        <p className="text-sm text-neutral-400">
          Please select a payment method
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-2 tablet:gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-2 tablet:p-3"
            >
              <div className="flex flex-1 flex-col items-start gap-1">
                <div className="flex items-center gap-2 tablet:gap-3">
                  <Skeleton className="size-[25px] shrink-0 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded" />
                </div>
              </div>

              <div className="flex flex-1 items-end justify-end gap-2">
                <Skeleton className="h-5 w-16 rounded" />
              </div>
            </div>
          ))
        ) : paymentMethods.length > 0 ? (
          paymentMethods.map((item: Token, idx) => (
            <PaymentCard
              key={`${item.address}-${idx}`}
              item={item}
              isActive={activeIdx === idx}
              onClick={() => setActiveIdx(idx)}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed bg-gray-50 p-4 text-center text-sm text-gray-500">
            Not available on Chain ID: {chainId}
          </div>
        )}
      </div>

      <DefaultButton
        onClick={onClickMint}
        disabled={loading || paymentMethods.length === 0}
      >
        Mint
      </DefaultButton>
    </>
  )
}

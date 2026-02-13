'use client'

import { useEffect, useState } from 'react'
import { useChainId } from 'wagmi'
import DefaultButton from '@/ui/buttons/default-btn'
import { useMintCtx } from '../../contexts/mint.context'
import { getPaymentMethods, Token } from '@/constants/contracts/payments'
import { PaymentCard } from './payment-card'
import { Skeleton } from '@/ui/skeleton'
import { MintStatus } from '../../enums/mint.enum'
import { TSB_CONTRACTS } from '@/constants/contracts/addresses'
import { useUser } from '@/hooks/useUser'

export default function SelectPaymentMethod() {
  const [localLoading, setLocalLoading] = useState<boolean>(true)
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [paymentMethods, setPaymentMethods] = useState<Token[]>([])
  const { setPaymentMethod, setTargetContract, setStatus } = useMintCtx()
  const chainId = useChainId()
  const { isLoggedIn, isLoading: isUserLoading } = useUser()

  const isLoadingState = isUserLoading || localLoading

  useEffect(() => {
    // Reset state when user logs out
    if (!isLoggedIn) {
      setLocalLoading(false)
      setPaymentMethods([])
      return
    }
    setLocalLoading(true)

    // Get payment methods based on the current chain ID
    const methods = getPaymentMethods(chainId)
    setPaymentMethods(methods)
    setActiveIdx(0)

    const timer = setTimeout(() => {
      setLocalLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [chainId, isLoggedIn])

  // On click button
  const onClickReview = () => {
    if (!isLoggedIn) return
    setPaymentMethod(paymentMethods[activeIdx])
    setTargetContract(TSB_CONTRACTS[chainId])
    setStatus(MintStatus.REVIEW)
  }

  const skeletonCount = paymentMethods.length > 0 ? paymentMethods.length : 2

  return (
    <>
      <div className="mb-4 text-left">
        <h3 className="font-medium">Payment methods</h3>
        <p className="text-sm text-neutral-400">
          Please select a payment method
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-2 tablet:gap-4">
        {isLoadingState ? (
          Array.from({ length: skeletonCount }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-2 tablet:p-3"
            >
              <div className="flex flex-1 flex-col items-start gap-1">
                <div className="flex items-center gap-2 tablet:gap-3">
                  <Skeleton className="size-6.25 shrink-0 rounded-full" />
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
        onClick={onClickReview}
        disabled={!isLoggedIn || isLoadingState || paymentMethods.length === 0}
      >
        {isLoadingState
          ? 'Loading...'
          : !isLoggedIn
            ? 'Connect Wallet'
            : 'Mint'}
      </DefaultButton>
    </>
  )
}

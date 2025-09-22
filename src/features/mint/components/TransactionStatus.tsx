'use client'

import DefaultButton from '@/shared/ui/buttons/DefaultButton'

import Check from '@/features/mint/assets/icons/Check'
import Clock from '@/features/mint/assets/icons/ClockCountdown'
import XRound from '@/features/mint/assets/icons/XRound'
import { useEffect, useState } from 'react'
import { useMintCtx } from '../context/MintContext'

enum Status {
  PENDING = 'PENDING', // 0
  SUCCESS = 'SUCCESS', // 1
  FAILED = 'FAILED', // 2
}

const state = [
  {
    status: Status.PENDING,
    color: '#1346AC',
    shadow: 'bg-[#1346AC]/40',
    message: 'Transaction pending...',
    desc: 'Please don’t close or refresh this page.',
  },
  {
    status: Status.SUCCESS,
    color: '#246234',
    shadow: 'bg-[#246234]/40',
    message: 'Transaction completed',
    desc: 'Thank you for your payment, TSB is now yours!',
  },
  {
    status: Status.FAILED,
    color: '#D63B29',
    shadow: 'bg-[#D63B29]/40',
    message: 'Transaction failed',
    desc: 'Try again to mint the NFT.',
  },
]

export default function TransactionStatus() {
  const { setIsOnTx } = useMintCtx()
  const [status, setStatus] = useState<Status>(Status.PENDING)
  const [current, setCurrent] = useState(state[0])

  // update current whenever status changes
  useEffect(() => {
    const match = state.find((s) => s.status === status)
    if (match) setCurrent(match)
  }, [status])

  const changeStatus = () => {
    // Get current index
    const index = Object.values(Status).indexOf(status)

    // Compute next index, wrap around with modulo
    const nextIndex = (index + 1) % Object.values(Status).length

    // Update to the next status
    setStatus(Object.values(Status)[nextIndex] as Status)
  }

  return (
    <div className="mint-modal">
      <div className="mx-auto py-4 tablet:py-8">
        <div
          key={status}
          className={`absolute h-16 w-24 tablet:h-20 ${current?.shadow} animate-zoom-in select-none blur-2xl`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        />

        <div
          className="shadow-xs relative z-10 cursor-pointer rounded-full bg-white p-2 tablet:p-4"
          onClick={changeStatus}
        >
          {current?.status === Status.PENDING && (
            <Clock size={50} colors={current?.color} />
          )}
          {current?.status === Status.SUCCESS && (
            <Check size={50} colors={current?.color} />
          )}
          {current?.status === Status.FAILED && (
            <XRound size={50} colors={current?.color} />
          )}
        </div>
      </div>

      <div className="space-y-2 text-center">
        <h3 className="font-medium">{current?.message}</h3>
        <p className="text-sm text-neutral-30">{current?.desc}</p>
      </div>

      {(current?.status === Status.FAILED ||
        current?.status === Status.SUCCESS) && (
        <div className="flex flex-col gap-2">
          {current?.status === Status.SUCCESS && (
            <DefaultButton classname="w-full" onClick={() => setIsOnTx(false)}>
              View transaction detail
            </DefaultButton>
          )}

          {current?.status === Status.FAILED && (
            <DefaultButton classname="w-full" onClick={() => setIsOnTx(false)}>
              Try again
            </DefaultButton>
          )}
          <DefaultButton
            variant="secondary"
            onClick={() => (window.location.href = '/')}
          >
            Return home
          </DefaultButton>
        </div>
      )}
    </div>
  )
}

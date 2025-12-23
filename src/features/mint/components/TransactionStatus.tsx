'use client'

import DefaultButton from '@/shared/ui/buttons/DefaultButton'
import { useEffect, useState } from 'react'
import { useMintCtx } from '../context/MintContext'
import { Checkmark } from '../ui/Checkmark'
import { Crossmark } from '../ui/Crossmark'
import Clock from '../ui/Clock'
import { motion, AnimatePresence } from 'framer-motion'
import { MintStatus } from '../contants/MintEnum'

const state = [
  {
    status: MintStatus.PENDING,
    color: '#1346AC',
    shadow: 'bg-[#1346AC]/40',
    message: 'Transaction pending',
    desc: 'Please don’t close or refresh this page.',
  },
  {
    status: MintStatus.SUCCESS,
    color: '#246234',
    shadow: 'bg-[#246234]/40',
    message: 'Transaction completed',
    desc: 'Thank you for your payment, TSB is now yours!',
  },
  {
    status: MintStatus.FAILED,
    color: '#D63B29',
    shadow: 'bg-[#D63B29]/40',
    message: 'Transaction failed',
    desc: 'Failed to mint the NFT.',
  },
]

interface TransactionStatusProps {
  status: MintStatus
}

export default function TransactionStatus({ status }: TransactionStatusProps) {
  const { setStatus } = useMintCtx()
  const [data, setData] = useState(state[0])

  // update current whenever status changes
  useEffect(() => {
    const match = state.find((s) => s.status === status)
    if (match) setData(match)
  }, [status])

  const changeStatus = () => {
    // Get current index
    const index = Object.values(MintStatus).indexOf(status)

    // Compute next index, wrap around with modulo
    const nextIndex = (index + 1) % Object.values(MintStatus).length

    // Update to the next status
    setStatus(Object.values(MintStatus)[nextIndex] as MintStatus)
  }

  return (
    <>
      <div className="space-y-8">
        <div className="mx-auto w-fit py-4 tablet:py-8">
          <div
            key={status}
            className={`absolute h-16 w-24 tablet:h-20 ${data?.shadow} animate-zoom-in blur-2xl`}
            style={{
              transform: 'translate3d(0,0,0)',
              willChange: 'filter',
            }}
          />

          <div
            className="relative z-10 w-fit cursor-pointer rounded-full bg-white p-3 shadow-xs tablet:p-4"
            onClick={changeStatus}
          >
            {status === MintStatus.PENDING && (
              <Clock size={60} color={data?.color} />
            )}
            {status === MintStatus.SUCCESS && (
              <Checkmark size={60} color={data?.color} />
            )}
            {status === MintStatus.FAILED && (
              <Crossmark size={60} color={data?.color} />
            )}
          </div>
        </div>

        <motion.div
          key={status}
          className="space-y-2 text-center"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <h3 className="font-medium">{data?.message}</h3>
          <motion.p
            className="text-sm text-neutral-30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1.2,
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {data?.desc}
          </motion.p>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
        >
          {status === MintStatus.SUCCESS && (
            <DefaultButton classname="w-full" onClick={() => setStatus(null)}>
              View transaction
            </DefaultButton>
          )}

          {status === MintStatus.FAILED && (
            <DefaultButton classname="w-full" onClick={() => setStatus(null)}>
              Try again
            </DefaultButton>
          )}

          <DefaultButton
            variant={status === MintStatus.PENDING ? 'primary' : 'secondary'}
            disabled={status === MintStatus.PENDING ? true : false}
            onClick={() => (window.location.href = '/')}
          >
            {status === MintStatus.PENDING ? 'Minting' : 'Return home'}
          </DefaultButton>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

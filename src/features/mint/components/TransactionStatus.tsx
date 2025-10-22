'use client'

import DefaultButton from '@/shared/ui/buttons/DefaultButton'
import { useEffect, useState } from 'react'
import { useMintCtx } from '../context/MintContext'
import { Checkmark } from '../ui/Checkmark'
import { Crossmark } from '../ui/Crossmark'
import Clock from '../ui/Clock'
import { motion, AnimatePresence } from 'framer-motion'
import { Status } from '../contants/StatusEnum'

const state = [
  {
    status: Status.PENDING,
    color: '#1346AC',
    shadow: 'bg-[#1346AC]/40',
    message: 'Transaction pending',
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
    desc: 'Failed to mint the NFT.',
  },
]

interface TransactionStatusProps {
  status: Status
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
    const index = Object.values(Status).indexOf(status)

    // Compute next index, wrap around with modulo
    const nextIndex = (index + 1) % Object.values(Status).length

    // Update to the next status
    setStatus(Object.values(Status)[nextIndex] as Status)
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
            className="shadow-xs relative z-10 w-fit cursor-pointer rounded-full bg-white p-3 tablet:p-4"
            onClick={changeStatus}
          >
            {status === Status.PENDING && (
              <Clock size={60} color={data?.color} />
            )}
            {status === Status.SUCCESS && (
              <Checkmark size={60} color={data?.color} />
            )}
            {status === Status.FAILED && (
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
          {status === Status.SUCCESS && (
            <DefaultButton classname="w-full" onClick={() => setStatus(null)}>
              View transaction
            </DefaultButton>
          )}

          {status === Status.FAILED && (
            <DefaultButton classname="w-full" onClick={() => setStatus(null)}>
              Try again
            </DefaultButton>
          )}

          <DefaultButton
            variant={status === Status.PENDING ? 'primary' : 'secondary'}
            disabled={status === Status.PENDING ? true : false}
            onClick={() => (window.location.href = '/')}
          >
            {status === Status.PENDING ? 'Minting' : 'Return home'}
          </DefaultButton>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

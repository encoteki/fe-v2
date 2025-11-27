'use client'

import Image from 'next/image'
import { useState } from 'react'
import DefaultButton from '@/shared/ui/buttons/DefaultButton'
import { useMintCtx } from '../context/MintContext'
import { Status } from '../contants/StatusEnum'
import {
  PAYMENT_ETH,
  PAYMENT_IDRX,
  PAYMENT_USDC,
  PaymentMethod,
} from '../contants/paymentMethods'

export const paymentMethods: PaymentMethod[] = [
  PAYMENT_ETH,
  PAYMENT_USDC,
  PAYMENT_IDRX,
]

export default function SelectPaymentMethod() {
  const { setStatus } = useMintCtx()
  const [activeIdx, setActiveIdx] = useState<number>(0)

  const onChangePayment = (index: number) => {
    setActiveIdx(index)
  }

  const onClickMint = () => {
    setStatus(Status.PENDING)
  }

  return (
    <>
      <div className="text-left">
        <h3 className="font-medium">Payment methods</h3>
        <p className="text-neutral-40 text-sm">
          Please select a payment method
        </p>
      </div>
      <div className="tablet:gap-4 flex flex-col gap-2">
        {paymentMethods.map((item, idx) => {
          return (
            <button
              onClick={() => onChangePayment(idx)}
              key={idx}
              className={`tablet:p-3 flex items-center justify-between rounded-2xl border p-2 transition-colors ${activeIdx === idx ? `${item.color} border-white` : 'border-gray-200'}`}
            >
              <div className="flex flex-1 flex-col items-start gap-1">
                <div className="tablet:gap-3 flex gap-2 font-medium">
                  <Image
                    src={item.icon}
                    alt="alt"
                    width={25}
                    height={25}
                    className="size-[25px] rounded-full"
                    priority
                  />{' '}
                  <p className="tablet:text-lg text-base"> {item.name}</p>
                </div>

                <p className="tablet:text-xs text-[10px] text-gray-400">
                  Balance: 0.001 {item.name}
                </p>
              </div>

              <div className="flex flex-1 items-end justify-end gap-2">
                <p>{item.cost}</p>
                <p>{item.name}</p>
              </div>
            </button>
          )
        })}
      </div>
      <DefaultButton onClick={onClickMint}>Mint</DefaultButton>
    </>
  )
}

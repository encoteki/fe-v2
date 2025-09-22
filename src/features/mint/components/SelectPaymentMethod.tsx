'use client'

import Image from 'next/image'
import ETH from '@/features/mint/assets/eth.webp'
import IDRX from '@/features/mint/assets/idrx.webp'
import LSK from '@/features/mint/assets/lisk.webp'
import { useState } from 'react'
import DefaultButton from '@/shared/ui/buttons/DefaultButton'
import { useMintCtx } from '../context/MintContext'

const paymentMethods = [
  {
    name: 'ETH',
    icon: ETH,
    color: 'bg-gray-100',
    cost: '0.01',
  },
  {
    name: 'LSK',
    icon: LSK,
    color: 'bg-black/10',
    cost: '0.001',
  },
  {
    name: 'IDRX',
    icon: IDRX,
    color: 'bg-primary-blue/10',
    cost: '350.000',
  },
]

export default function SelectPaymentMethod() {
  const { setIsOnTx } = useMintCtx()
  const [activeIdx, setActiveIdx] = useState<number>(0)

  const onChangePayment = (index: number) => {
    setActiveIdx(index)
  }

  const onClickMint = () => {
    setIsOnTx(true)
  }

  return (
    <>
      <div className="mint-modal">
        <div className="text-left">
          <h2 className="font-medium">Payment methods</h2>
          <p className="text-sm text-neutral-40">
            Please select a payment method
          </p>
        </div>

        <div className="flex flex-col gap-2 tablet:gap-4">
          {paymentMethods.map((item, idx) => {
            return (
              <button
                onClick={() => onChangePayment(idx)}
                key={idx}
                className={`flex items-center justify-between rounded-2xl border p-2 transition-colors tablet:p-3 ${activeIdx === idx ? `${item.color} border-white` : 'border-gray-200'}`}
              >
                <div className="flex flex-1 flex-col items-start gap-1">
                  <div className="flex gap-2 font-medium tablet:gap-3">
                    <Image
                      src={item.icon}
                      alt="alt"
                      width={25}
                      height={25}
                      className="size-[25px]"
                      priority
                    />{' '}
                    <h3> {item.name}</h3>
                  </div>

                  <p className="text-[10px] text-gray-400 tablet:text-xs">
                    Balance: 0.001 {item.name}
                  </p>
                </div>

                <div className="flex flex-1 items-end justify-end gap-2">
                  <p>{item.cost}</p>
                  <p className="">{item.name}</p>
                </div>
              </button>
            )
          })}

          <div className="mx-2 flex justify-between">
            <p>Amount</p>
            <p>
              {paymentMethods[activeIdx].cost} {paymentMethods[activeIdx].name}
            </p>
          </div>
        </div>

        <DefaultButton onClick={onClickMint}>Mint</DefaultButton>
      </div>
    </>
  )
}

import Image from 'next/image'
import DefaultButton from '@/shared/ui/buttons/DefaultButton'
import { useMintCtx } from '../context/MintContext'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import Hidden from '@/features/mint/assets/hidden.png'
import { Token } from '@/shared/constants/payments'
import { formatIDR } from '../utils/formatBalance'
import { MintStatus } from '../contants/MintEnum'
import { useEffect } from 'react'
import { MintButton } from '../ui/mint-button'

export default function ReviewTransaction() {
  const { paymentMethod, setStatus, status, targetContract } = useMintCtx()

  useEffect(() => {
    console.log(`payment address: ${paymentMethod?.address}`)
    console.log('contract:', targetContract)
  }, [])

  return (
    <>
      <div className="text-left">
        <h3 className="font-medium">Review Transaction</h3>
        <p className="text-sm text-neutral-400">
          Please review your transaction details.
        </p>
      </div>

      <TransactionCard item={paymentMethod!} />

      <div className="flex w-full flex-col">
        {/* <TransactionQuote
          contractAddress={tsbgmc.address as Address}
          functionName="mintLocal"
          abi={tsbgmc.abi as any}
          args={[]}
        /> */}

        {/* Total */}
        <div className="flex w-full justify-between">
          <p className="font-medium">Total</p>
          <p className="font-medium">
            {paymentMethod?.symbol === 'IDRX'
              ? formatIDR(Number(paymentMethod?.cost))
              : paymentMethod?.cost}{' '}
            {paymentMethod?.symbol}
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        <MintButton />
        <DefaultButton
          variant="secondary"
          onClick={() => setStatus(MintStatus.HOME)}
        >
          Cancel
        </DefaultButton>
      </div>
    </>
  )
}

const TransactionCard = ({ item }: { item: Token | null }) => {
  return (
    <div className="flex items-center justify-center">
      {/* Container Utama */}
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-gray-100 p-4 shadow-lg tablet:space-y-6">
        {/* === Baris 1: SEND === */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon Wrapper */}
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                <Image
                  src={item?.logo || ''}
                  alt={item?.symbol || ''}
                  width={100}
                  height={100}
                />
              </div>
              {/* Badge Icon (Panah Kecil) */}
              <div className="absolute -right-1 -bottom-1 rounded-full border border-[#18191f] bg-white p-0.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-green">
                  <ArrowRight size={10} className="text-white" />
                </div>
              </div>
            </div>

            {/* Text Kiri */}
            <div className="flex flex-col">
              <span className="text-lg leading-tight font-medium">Send</span>
              <span className="text-sm font-medium text-gray-500">
                {item?.symbol}
              </span>
            </div>
          </div>

          {/* Text Kanan (Amount) */}
          <div className="flex flex-col items-end">
            <span className="font-medium">
              -{' '}
              {item?.symbol === 'IDRX'
                ? formatIDR(Number(item.cost))
                : item?.cost}{' '}
              {item?.symbol}
            </span>
          </div>
        </div>

        {/* === Baris 2: RECEIVE === */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon Wrapper */}
            <div className="relative">
              <div className="h-12 w-12 overflow-hidden rounded-xl">
                <Image src={Hidden} alt="hidden" width={999} height={999} />
              </div>
              {/* Badge Icon (Panah Kecil) */}
              <div className="absolute -right-1 -bottom-1 rounded-full border border-[#18191f] bg-white p-0.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-green">
                  <ArrowLeft size={10} className="text-white" />
                </div>
              </div>
            </div>

            {/* Text Kiri */}
            <div className="flex flex-col">
              <span className="text-lg leading-tight font-medium">Receive</span>
              <span className="text-sm font-medium text-gray-500">NFT</span>
            </div>
          </div>

          {/* Text Kanan (NFT Detail) */}
          <div className="flex flex-col items-end">
            <span className="font-medium">1 NFT TSB</span>
          </div>
        </div>
      </div>
    </div>
  )
}

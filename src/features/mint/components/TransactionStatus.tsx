import DefaultButton from '@/shared/ui/buttons/DefaultButton'
import MovingNFTCard from '../ui/MovingNFTCard'

export default function TransactionStatus() {
  return (
    <div className="mint-modal flex max-w-[400px] flex-col gap-6 shadow-lg tablet:w-[400px]">
      <div className="mx-auto">
        <MovingNFTCard />
      </div>

      <div className="space-y-2 text-center">
        <h3 className="font-medium">Payment Successful</h3>
        <p className="text-sm text-neutral-30">
          Thank you for your payment, TSB is now yours!
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <DefaultButton classname="w-full">
          View transaction detail
        </DefaultButton>
        <DefaultButton variant="secondary">Return home</DefaultButton>
      </div>
    </div>
  )
}

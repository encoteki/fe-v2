import { GlareMovingCard } from '@/features/mint/ui/GlareMovingCard'
import Metamask from '@/shared/assets/logos/MetaMask-icon-fox.svg'
import Image from 'next/image'
import { shortenAddress } from '@/features/wallet/utils/shortenAddress'

interface WalletButtonProps {
  onClick?: () => void
  classname?: string
  variant?: 'primary' | 'secondary'
}

export default function WalletButton({
  onClick,
  classname = '',
  variant = 'primary',
}: WalletButtonProps) {
  const shortenedAddress = shortenAddress(
    '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  )

  return (
    <div
      onClick={onClick}
      className={`rounded-full px-4 py-3 transition duration-300 hover:scale-105 tablet:px-6 desktop:px-6 desktop:py-3 ${classname} ${
        variant === 'primary'
          ? 'bg-primary-green text-white hover:bg-green-10'
          : 'border border-primary-green bg-white text-primary-green hover:bg-primary-green/5'
      } disabled:cursor-default`}
    >
      <div className="items-center-safe flex gap-3">
        <GlareMovingCard>
          <Image
            src={Metamask}
            alt="alt"
            width={50}
            height={50}
            className="size-4 tablet:size-6"
          />
        </GlareMovingCard>
        <p className="text-sm font-medium tablet:block">{shortenedAddress}</p>
      </div>
    </div>
  )
}

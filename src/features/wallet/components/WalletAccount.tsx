import { shortenAddress } from '../utils/shortenAddress'
import Image from 'next/image'
import Metamask from '@/shared/assets/logos/MetaMask-icon-fox.svg'
import { Power } from 'lucide-react'
import ETH from '@/shared/assets/logos/eth.webp'
import IDRX from '@/shared/assets/logos/idrx.webp'
import LSK from '@/shared/assets/logos/lisk.webp'
import { GlareMovingCard } from '@/shared/ui/GlareMovingCard'
import Tiggy from '@/shared/assets/tsb/Tiggy_tp.webp'

const erc20 = [
  {
    name: 'ETH',
    icon: ETH,
    color: 'bg-gray-700/10',
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

export default function WalletAccount() {
  const shortenedAddress = shortenAddress(
    '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  )

  return (
    <>
      <div className="py-18 grid flex-1 auto-rows-min gap-6 px-6">
        <div className="flex items-center gap-4 rounded-2xl bg-khaki-70 p-4 shadow-lg">
          <GlareMovingCard>
            <Image src={Metamask} alt="alt" width={25} height={25} />
          </GlareMovingCard>
          <h3 className="font-medium">{shortenedAddress}</h3>
          <Power size={18} className="ml-auto cursor-pointer" />
        </div>

        <div className="grid gap-4">
          <h2 className="ml-2 font-medium">Balance</h2>
          {erc20.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex items-center gap-4 rounded-2xl ${item.color} p-4 shadow-lg`}
              >
                <Image src={item.icon} alt={item.name} width={25} height={25} />
                <h3 className="font-medium">{item.name}</h3>
                <h3 className="ml-auto font-medium">{item.cost}</h3>
              </div>
            )
          })}
        </div>

        <div className="grid gap-4">
          <h2 className="ml-2 font-medium">Your NFT&lsquo;s</h2>
          <GlareMovingCard>
            <Image src={Tiggy} alt="alt" />
          </GlareMovingCard>
        </div>
      </div>
    </>
  )
}

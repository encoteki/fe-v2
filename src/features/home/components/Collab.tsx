'use client'

import Image from 'next/image'
import Lisk from '@/features/home/assets/logos/Lisk.webp'
import IDNFT from '@/features/home/assets/logos/IDNFT.webp'
import Manta from '@/features/home/assets/logos/MantaNetwork.webp'
import W3W from '@/features/home/assets/logos/Web3Week.webp'
import Angelhack from '@/features/home/assets/logos/angelhack.webp'
import Base from '@/features/home/assets/logos/Base.svg'
import { Marquee } from '@/shared/ui/Marquee'

const logos = [Lisk, Angelhack, Manta, IDNFT, W3W, Base]

function CollabMarquee() {
  return (
    <>
      <Marquee pauseOnHover className="px-2 [--duration:10s]">
        {logos.map((src, idx) => (
          <div
            className="tablet:mx-6 tablet:size-32 desktop:mx-8 desktop:size-40 mx-3 grid size-24 place-content-center"
            key={idx}
          >
            <Image
              src={src}
              alt="collaborations"
              priority
              width={200}
              height={200}
              className="desktop:size-30 tablet:size-24 size-18 object-contain"
            />
          </div>
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </>
  )
}

export default function Collab() {
  return (
    <div className="tablet:mt-12 relative mt-6 flex w-full flex-col items-center justify-center overflow-hidden bg-transparent">
      <CollabMarquee />
    </div>
  )
}

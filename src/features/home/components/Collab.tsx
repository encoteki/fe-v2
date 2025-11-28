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
            className="mx-3 grid size-24 place-content-center tablet:mx-6 tablet:size-32 desktop:mx-8 desktop:size-40"
            key={idx}
          >
            <Image
              src={src}
              alt="collaborations"
              priority
              width={200}
              height={200}
              className="size-18 object-contain tablet:size-24 desktop:size-30"
            />
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background"></div>
    </>
  )
}

export default function Collab() {
  return (
    <div className="relative mt-6 flex w-full flex-col items-center justify-center overflow-hidden bg-transparent tablet:mt-12">
      <CollabMarquee />
    </div>
  )
}

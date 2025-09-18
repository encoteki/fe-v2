/* eslint-disable @next/next/no-img-element */
import { GlareMovingCard } from './GlareMovingCard'

interface MovingNFTCardProps {
  imgUrl?: string
  title?: string
  tokenId?: string | number
  classname?: string
}

export default function MovingNFTCard({
  imgUrl = 'https://ipfs.io/ipfs/QmWEAkDVdEnPh5wyZmNkSgoZH3dWaQRSWc6YLFTrtzaryH/1.png',
  title = 'The Satwas Band #1',
  tokenId = 1,
  classname = '',
}: MovingNFTCardProps) {
  return (
    <GlareMovingCard>
      <button
        type="button"
        className={`flex w-60 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-khaki-90 p-2 md:my-4 tablet:w-72 ${classname}`}
        aria-label="View invite F7RA"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'none',
          opacity: 1,
        }}
      >
        <div className="mx-2 flex-1">
          <div className="relative mt-2 aspect-[3/4] w-full">
            <img
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover"
              alt={title}
              src={imgUrl}
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 5px 6px 0px',
                opacity: 1,
              }}
            />
          </div>
        </div>
        <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono">
          <div className="text-xs">{title}</div>
          <div className="text-xs opacity-50">{`#${tokenId}`}</div>
        </div>
      </button>
    </GlareMovingCard>
  )
}

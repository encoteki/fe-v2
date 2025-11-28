'use client'

import { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/Carousel'
import HomeHeading from '../ui/HomeHeading'
import { Reveal } from '../../../shared/ui/Reveal'
import MovingNFTCard from '../ui/MovingNFTCard'

const tsb = [
  { name: 'Cendry', url: '/assets/CENDRY.png' },
  { name: 'Gajara', url: '/assets/GAJARA.png' },
  { name: 'Kanghoon', url: '/assets/KANGHOON.png' },
  { name: 'Komesi', url: '/assets/KOMESI.png' },
  { name: 'Owen', url: '/assets/OWEN.png' },
  { name: 'Tiggy', url: '/assets/TIGGY.png' },
]

const stepDelay = (index: number, base = 0, step = 100) => base + index * step

export default function Collections() {
  const [isTabletUp, setIsTabletUp] = useState(false)

  useEffect(() => {
    const check = () => setIsTabletUp(window.innerWidth >= 768) // Tailwind's md breakpoint
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      id="collection"
      className="home-container mx-auto max-w-[3000px] px-0"
    >
      {isTabletUp ? (
        <Reveal variant="fade" duration={500}>
          <HomeHeading
            title={'NFT Collection'}
            desc={
              'Our collection, The Satwas Band, are inspired by endangered animals in Indonesia. Mint and collect them all!'
            }
            align="left"
          />
        </Reveal>
      ) : (
        <HomeHeading
          title={'NFT Collection'}
          desc={
            'Our collection, The Satwas Band, are inspired by endangered animals in Indonesia. Mint and collect them all!'
          }
          align="left"
        />
      )}

      <Carousel opts={{ align: 'start' }} className="w-full">
        <CarouselContent className="mx-6 my-4 tablet:mx-12">
          {tsb.map((item, index) => {
            const card = (
              <MovingNFTCard
                classname="w-full bg-khaki-90"
                imgUrl={item.url}
                title={item.name}
                tokenId={index + 1}
              />
            )
            return (
              <CarouselItem
                key={index}
                className="max-w-[340px] basis-1/1 px-4"
              >
                {isTabletUp ? (
                  <Reveal
                    variant="up"
                    duration={600}
                    delay={stepDelay(index, 0, 120)}
                    threshold={0.2}
                  >
                    {card}
                  </Reveal>
                ) : (
                  card
                )}
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

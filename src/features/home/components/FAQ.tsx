'use client'

import { useState } from 'react'
import HomeHeading from '../ui/HomeHeading'
import Image from 'next/image'
import Arrow from '@/features/home/assets/icons/icn-arrow-down.svg'
import { Reveal } from '@/shared/ui/Reveal'

const faqList = [
  {
    question: 'What is NFT ?',
    answer:
      'NFTs (non-fungible tokens) are unique cryptographic tokens that exist on a blockchain and cannot be replicated. NFTs represent real-world objects like real estate and artwork, or digital objects like graphic art, videos, and music. With NFTs, people can buy, sell, and trade their assets more efficiently while reducing the probability of fraud. NFTs also have utilities that include things like a digital asset, a service, membership, access to specific events, and any other advantages, depending on the creator.',
  },
  {
    question: 'What is The Satwas Band NFTs ?',
    answer:
      'The Satwas Band is our first NFTs collection, which consists of 3653 randomly generated art, consisting of 5 endangered Indonesian animals that formed into a music group. The Satwas Band will be generated on Polygon Blockchain. Forty percent of the royalties will be donated to the national park that will be chosen by the holders.',
  },
  {
    question: 'Can The Satwa Band NFTs act as an investment ?',
    answer:
      'Every investment has its own risk and rewards, and so do NFTs. The Satwas Band NFTs and ENCOTEKI itself are not an exception to that. We ourselves place ENCOTEKI as an Impact Investing. As we believe that providing value as much as we can to the environment, community, as well as the holders will also increase the value of The Satwas Band NFTs and ENCOTEKI in return.',
  },
  {
    question: 'How to buy The Satwas Band NFTs ?',
    answer: 'Get whitelisted!',
  },
]

// simple stagger helper (ms)
const stepDelay = (i: number, base = 0, step = 80) => base + i * step

export default function FAQ() {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null)

  const handleClick = (index: number) => {
    setVisibleIndex(visibleIndex === index ? null : index)
  }

  return (
    <section id="faq" className="home-container">
      <Reveal variant="fade" duration={500}>
        <HomeHeading
          title={'FAQ'}
          desc={
            'Find quick answers to commonly asked questions about Encoteki.'
          }
        />
      </Reveal>

      <div className="mx-auto grid max-w-3xl gap-4">
        {faqList.map((item, index) => {
          const isOpen = visibleIndex === index

          return (
            <Reveal
              key={index}
              variant="up"
              duration={600}
              delay={stepDelay(index)}
            >
              <div
                onClick={() => handleClick(index)}
                className={`rounded-3xl border border-[#E0E0E0] bg-khaki-99 px-8 py-4 duration-200 hover:cursor-pointer hover:border-primary-green hover:text-primary-green tablet:rounded-4xl tablet:p-8`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`w-3/4 text-left text-xl font-medium duration-300 ${isOpen ? 'text-primary-green' : ''}`}
                  >
                    {item.question}
                  </span>
                  <div className="cursor-pointer">
                    <Image
                      src={Arrow}
                      alt={'alt'}
                      width={28}
                      height={28}
                      className={`duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </div>
                </div>

                <p
                  id="faq-content"
                  className={`transition-max-height overflow-hidden text-black duration-500 ease-in-out ${visibleIndex === index ? 'max-h-96 pt-6' : 'max-h-0 pt-0'} text-justify text-sm font-normal tablet:text-base`}
                >
                  {item.answer}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

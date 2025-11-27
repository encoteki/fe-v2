'use client'

import Image from 'next/image'
import HeroImg from '@/features/home/assets/hero.webp'
import { motion } from 'motion/react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-container tablet:rounded-b-[96px] desktop:rounded-b-[128px] flex flex-row items-center justify-center rounded-b-[64px]"
      style={{
        background: `
              radial-gradient(circle at 30% 30%, #f5f1d6, transparent 60%),
              radial-gradient(circle at 70% 40%, #f5f1d6, transparent 60%),
              radial-gradient(circle at 70% 80%, #d6f5d6, transparent 60%)
            `,
      }}
    >
      <div className="w-[910px] max-w-[910px] space-y-6 text-center">
        <motion.div
          className="display-72"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.43 }}
        >
          Welcome to Encoteki
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="tablet:text-2xl text-base"
        >
          Mint, earn, and make a difference. Our animal-themed NFTs fuel
          non-profit projects that aim to build a better world through
          technology and community-driven sustainability.
        </motion.div>
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
        >
          <Image src={HeroImg} alt="hero" />
        </motion.div>
      </div>
    </section>
  )
}

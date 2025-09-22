'use client'

import { useAppCtx } from '@/shared/context/AppContext'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface HoverNavMenuProps {
  label: string
  href?: string
}

export const HoverNavMenu = ({ items }: { items: HoverNavMenuProps[] }) => {
  const { activeIdx, setActiveIdx } = useAppCtx()
  const router = useRouter()
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const foundIdx = items.findIndex((item) =>
      pathname.startsWith(item.href ? item.href : ''),
    )
    if (foundIdx !== -1 && foundIdx !== activeIdx) {
      setActiveIdx(foundIdx)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20) // activate blur after 20px scroll
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`hidden rounded-full border border-primary-green transition-colors ${scrolled ? 'bg-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.1)] backdrop-blur-lg' : 'bg-white shadow-lg'} p-2 tablet:flex tablet:p-3`}
    >
      {items.map((item, idx) => {
        const isActive = activeIdx === idx
        return (
          <button
            key={idx}
            onClick={() => {
              setActiveIdx(idx)
              router.push(item.href ? item.href : '/app')
            }}
            className={cn(
              'relative rounded-full font-medium tablet:min-w-24 tablet:px-4 tablet:py-2 desktop:min-w-32 desktop:px-6 desktop:py-3',
              isActive && 'text-white',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-green-10"
              />
            )}
            <span className="relative z-10 font-medium">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

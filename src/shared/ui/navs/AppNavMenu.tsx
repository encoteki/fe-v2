'use client'

import { useAppCtx } from '@/shared/context/AppContext'
import { cn } from '@/lib/utils'

import React, { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

interface HoverNavMenuProps {
  label: string
  href?: string
}

export const AppNavMenu = ({ items }: { items: HoverNavMenuProps[] }) => {
  const { activeIdx, setActiveIdx } = useAppCtx()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const foundIdx = items.findIndex((item) =>
      pathname.startsWith(item.href ? item.href : ''),
    )
    if (foundIdx !== -1 && foundIdx !== activeIdx) {
      setActiveIdx(foundIdx)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`hidden rounded-full border border-primary-green bg-white p-1 shadow-lg transition-all tablet:flex tablet:p-2`}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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

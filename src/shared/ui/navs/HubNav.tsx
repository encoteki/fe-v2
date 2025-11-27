'use client'

import { useAppCtx } from '@/shared/context/AppContext'
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { NavProps } from '@/shared/types/nav'

export const HubNav = ({ items }: { items: NavProps[] }) => {
  const { activeIdx, setActiveIdx } = useAppCtx()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const foundIdx = items.findIndex((item) => pathname.startsWith(item.id))
    if (foundIdx !== -1 && foundIdx !== activeIdx) {
      setActiveIdx(foundIdx)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`border-primary-green tablet:flex tablet:p-2 hidden rounded-full border bg-white p-1 shadow-lg transition-all`}
    >
      {items.map((item, idx) => {
        const isActive = activeIdx === idx
        return (
          <button
            key={idx}
            onClick={() => {
              setActiveIdx(idx)
              router.push(item.id)
            }}
            className={cn(
              'text-green-10 tablet:min-w-24 tablet:px-4 tablet:py-2 desktop:min-w-32 desktop:px-6 desktop:py-3 relative rounded-full',
              isActive && '',
            )}
          >
            {isActive && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="bg-primary-green/20 absolute inset-0 rounded-full"
              />
            )}
            <span className="relative z-10 font-medium">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

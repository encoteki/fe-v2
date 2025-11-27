'use client'

import { useAppCtx } from '@/shared/context/AppContext'
import { cn } from '@/lib/utils'
import React, { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { NavProps } from '@/shared/types/nav'

export const HomeNav = ({ items }: { items: NavProps[] }) => {
  const { activeIdx, setActiveIdx } = useAppCtx()
  const sectionIds = useMemo(() => items.map((i) => i.id), [items])

  const scrollingToId = useRef<string | null>(null)
  const unlockTimer = useRef<number | null>(null)

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting || e.intersectionRatio > 0)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const picked = visible[0]
        if (!picked) return

        const id = picked.target.getAttribute('id')!
        const target = scrollingToId.current

        if (target) {
          if (id !== target) return
          const idx = sectionIds.indexOf(id)
          if (idx !== -1) setActiveIdx(idx)
          scrollingToId.current = null
          if (unlockTimer.current) {
            window.clearTimeout(unlockTimer.current)
            unlockTimer.current = null
          }
          return
        }

        const idx = sectionIds.indexOf(id)
        if (idx !== -1 && idx !== activeIdx) setActiveIdx(idx)
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -30% 0px',
      },
    )

    sections.forEach((sec) => observer.observe(sec))

    const TOP_CLEAR_RATIO = 0.5
    const handleTopClear = () => {
      if (window.scrollY <= window.innerHeight * TOP_CLEAR_RATIO) {
        if (!scrollingToId.current) setActiveIdx(undefined)
      }
    }

    handleTopClear()

    window.addEventListener('scroll', handleTopClear, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleTopClear)
    }
  }, [sectionIds, activeIdx, setActiveIdx])

  const handleClick = (idx: number, id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return

    setActiveIdx(idx)
    scrollingToId.current = id

    history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}#${id}`,
    )

    el.scrollIntoView({ behavior: 'smooth', block: 'start' })

    if (unlockTimer.current) window.clearTimeout(unlockTimer.current)
    unlockTimer.current = window.setTimeout(() => {
      scrollingToId.current = null
      unlockTimer.current = null
    }, 1000)
  }

  return (
    <div className="bg-primary-green/10 hidden rounded-full p-2 backdrop-blur-xl transition-all duration-300 xl:flex">
      {items.map((item, idx) => {
        const isActive = activeIdx === idx
        return (
          <button
            key={item.id}
            onClick={handleClick(idx, item.id)}
            className={cn(
              'tablet:min-w-24 tablet:px-4 tablet:py-2 desktop:min-w-32 desktop:px-6 desktop:py-3 relative rounded-full font-medium',
            )}
          >
            <AnimatePresence>
              {isActive && (
                <motion.span
                  key="active-pill"
                  layoutId="active-pill"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="bg-primary-green/20 absolute inset-0 rounded-full"
                />
              )}
            </AnimatePresence>
            <span className="text-green-10 relative z-10 font-medium">
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { HamburgerXButton } from './HamburgerBtn'
import { NavProps } from '@/shared/types/nav'

export default function HamburgerMenu({ items }: { items: NavProps[] }) {
  const [open, setOpen] = useState(false)
  const btnId = useId()
  const panelId = useId()
  const firstItemRef = useRef<HTMLAnchorElement>(null)

  // Close on ESC
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Focus first item when opening
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstItemRef.current?.focus(), 100)
      return () => clearTimeout(t)
    }
  }, [open])

  return (
    <>
      <HamburgerXButton
        open={open}
        onToggle={() => setOpen(!open)}
        className="xl:hidden"
      />

      {/* Overlay + Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* dim background */}
            <motion.div
              key="overlay"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-white/20 backdrop-blur-lg xl:hidden"
            />

            {/* dropdown panel */}
            <motion.div
              key="panel"
              id={panelId}
              role="menu"
              aria-labelledby={btnId}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="tablet:top-25 fixed left-4 right-4 top-20 z-50 rounded-3xl border-2 border-primary-green/50 bg-primary-green p-2 shadow-xl xl:hidden"
            >
              <ul className="overflow-hidden rounded-2xl bg-primary-green">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className="border-b border-white/10 last:border-0"
                  >
                    <Link
                      href={'#' + item.id}
                      className="block w-full px-5 py-4 text-left text-white/95 outline-none transition hover:bg-white/20 hover:text-yellow-300 focus:bg-white/20"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

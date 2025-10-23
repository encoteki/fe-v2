'use client'

import { motion } from 'framer-motion'

export function HamburgerXButton({
  open,
  onToggle,
  className = '',
}: {
  open: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={onToggle}
      className={`relative inline-flex h-10 w-10 items-center justify-center bg-transparent ${className}`}
    >
      {/* 24x24 icon area */}
      <span className="relative block h-5 w-5">
        {/* top line */}
        <motion.span
          className="absolute left-0 top-0 z-50 block h-0.5 w-5 bg-current"
          initial={false}
          animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
        {/* middle line */}
        <motion.span
          className="absolute left-0 top-2 z-50 block h-0.5 w-5 bg-current"
          initial={false}
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
        />
        {/* bottom line */}
        <motion.span
          className="absolute left-0 top-4 z-50 block h-0.5 w-5 bg-current"
          initial={false}
          animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </span>
    </button>
  )
}

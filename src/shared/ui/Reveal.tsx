/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion, useReducedMotion } from 'motion/react'
import React, { JSX, useEffect, useRef, useState } from 'react'

type RevealProps = {
  children: React.ReactNode
  /** Element type to render, e.g., 'div', 'section', 'li', etc. */
  as?: React.ElementType
  /** Animation direction */
  variant?: 'fade' | 'up' | 'left' | 'right'
  /** Duration in ms */
  duration?: number
  /** Delay in ms */
  delay?: number
  /** How much of the element must be visible to trigger (0–1) */
  threshold?: number
  /** Reveal only once or on every scroll in/out */
  once?: boolean
  /** Optional className */
  className?: string
}

export function Reveal({
  children,
  as: As = 'div',
  variant = 'up',
  duration = 600,
  delay = 0,
  threshold = 0.2,
  once = true,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // initial inline styles before intersection
    const baseTransition = `transition: transform ${duration}ms ease, opacity ${duration}ms ease ${delay}ms; opacity:0;`
    const offsets: Record<typeof variant, string> = {
      fade: 'transform: translate3d(0,0,0);',
      up: 'transform: translate3d(0,16px,0);',
      left: 'transform: translate3d(16px,0,0);',
      right: 'transform: translate3d(-16px,0,0);',
    }

    el.setAttribute('style', baseTransition + offsets[variant])

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When visible → reveal
            el.style.opacity = '1'
            el.style.transform = 'translate3d(0,0,0)'

            if (once) {
              setShown(true)
              io.unobserve(entry.target)
            }
          } else if (!once && !shown) {
            // Reset if not once
            switch (variant) {
              case 'up':
                el.style.transform = 'translate3d(0,16px,0)'
                break
              case 'left':
                el.style.transform = 'translate3d(16px,0,0)'
                break
              case 'right':
                el.style.transform = 'translate3d(-16px,0,0)'
                break
              default:
                el.style.transform = 'translate3d(0,0,0)'
                break
            }
            el.style.opacity = '0'
          }
        })
      },
      { threshold },
    )

    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, duration, delay, threshold, once])

  const Component = As as any

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  )
}

/** Wrap children to stagger their reveals */
export function Stagger({
  as = 'div',
  gap = 0.08,
  children,
  className,
}: {
  as?: keyof JSX.IntrinsicElements
  /** seconds between children */
  gap?: number
  className?: string
  children: React.ReactNode[]
}) {
  const reduce = useReducedMotion()
  const M = motion[as as 'div']

  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : gap },
        },
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: 'easeOut' },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </M>
  )
}

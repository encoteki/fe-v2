'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type TextLineRevealProps = {
  /** Children you render; target spans inside will animate */
  children: React.ReactNode

  /** CSS selector relative to the container, default: ".line span" */
  unitSelector?: string

  /** ScrollTrigger start position */
  start?: string

  /** Animate every time it enters/leaves view (play/reverse) */
  retrigger?: boolean

  /** Tie progress to scroll (instead of play/reverse) */
  scrub?: boolean | number

  /** Show ScrollTrigger markers for tuning */
  markers?: boolean

  /** Motion params */
  delay?: number // s
  duration?: number // s
  staggerAmount?: number // s distributed across all items
  yFrom?: number // px
  skewYFrom?: number // deg
  ease?: string
}

export default function TextLineReveal({
  children,
  unitSelector = '.line span',
  start = 'top 85%',
  retrigger = true,
  scrub = false,
  markers = false,
  delay = 0.8,
  duration = 1.8,
  staggerAmount = 0.3,
  yFrom = 100,
  skewYFrom = 7,
  ease = 'power4.out',
}: TextLineRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const units = container.querySelectorAll<HTMLElement>(unitSelector)
    if (!units.length) return

    // initial state so each span enters together (no per-word split)
    gsap.set(units, {
      y: yFrom,
      skewY: skewYFrom,
      opacity: 0,
      willChange: 'transform, opacity',
    })

    const tl = gsap.timeline({
      defaults: { ease },
      delay,
      scrollTrigger: {
        trigger: container,
        start,
        markers,
        // if scrub is enabled, ignore toggleActions
        ...(scrub
          ? { scrub }
          : {
              toggleActions: retrigger
                ? 'play reverse play reverse' // re-trigger
                : 'play none none none', // play once per visit, no reverse
            }),
      },
    })

    tl.to(units, {
      y: 0,
      skewY: 0,
      opacity: 1,
      duration,
      stagger: { amount: staggerAmount },
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill()
      })
    }
  }, [
    unitSelector,
    start,
    retrigger,
    scrub,
    markers,
    delay,
    duration,
    staggerAmount,
    yFrom,
    skewYFrom,
    ease,
  ])

  return (
    <div ref={containerRef} className="overflow-hidden">
      {children}
    </div>
  )
}

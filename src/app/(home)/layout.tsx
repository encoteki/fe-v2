'use client'

import { useAppCtx } from '@/shared/context/AppContext'
import ReactLenis from 'lenis/react'
import { useEffect } from 'react'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setActiveIdx } = useAppCtx()

  // Reset homepage position on reload
  useEffect(() => {
    setActiveIdx(undefined)

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const nav = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    const isReload = nav?.type === 'reload'

    if (isReload) {
      if (window.location.hash) {
        history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search,
        )
      }

      window.scrollTo(0, 0)
      requestAnimationFrame(() => window.scrollTo(0, 0))
    }

    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto'
      }
    }
  }, [setActiveIdx])

  return <ReactLenis root>{children}</ReactLenis>
}

import { Suspense } from 'react'

export default function Family() {
  return (
    <Suspense fallback={<div className="h-10 w-40 animate-pulse rounded" />}>
      <section id="family" className="home-section bg-amber-500">
        Family
      </section>
    </Suspense>
  )
}

'use client'

import { MintProvider } from '@/contexts/mint.context'
import Footer from '@/components/footer'
import Header from '@/components/header'

export default function MintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MintProvider>
      <Header />
      {children}
      <Footer />
    </MintProvider>
  )
}

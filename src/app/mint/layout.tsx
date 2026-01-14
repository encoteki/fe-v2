'use client'

import { MintProvider } from '@/features/mint/context/MintContext'
import Footer from '@/shared/components/Footer'
import Header from '@/shared/components/Header'

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

'use client'

import { DaoProvider } from '@/features/dao/context/DaoContext'
import Footer from '@/shared/components/Footer'
import Header from '@/shared/components/Header'

export default function DaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <DaoProvider>
      <Header />
      {children}
      <Footer />
    </DaoProvider>
  )
}

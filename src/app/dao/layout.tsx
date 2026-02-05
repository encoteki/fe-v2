'use client'

import { DaoProvider } from '@/contexts/dao.context'
import Footer from '@/components/footer'
import Header from '@/components/header'

export default function DaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <DaoProvider>
      <Header />
      {children}
      <Footer />
    </DaoProvider>
  )
}

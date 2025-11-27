'use client'

import { AppProvider } from '@/shared/context/AppContext'
import { Web3Provider } from './Web3Provider'

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AppProvider>
      <Web3Provider>{children}</Web3Provider>
    </AppProvider>
  )
}

'use client'

import { AppProvider } from '@/shared/context/AppContext'
import { Web3Provider } from './Web3Provider'

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Web3Provider>
      <AppProvider>{children}</AppProvider>
    </Web3Provider>
  )
}

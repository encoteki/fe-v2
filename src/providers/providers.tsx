'use client'

import { AppProvider } from '@/contexts/app.context'
import { Web3Provider } from './web3.providers'

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

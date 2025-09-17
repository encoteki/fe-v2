'use client'

import { AppProvider } from '@/shared/context/AppContext'

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AppProvider>{children}</AppProvider>
}

'use client'

import { MintProvider } from '@/features/mint/context/MintContext'

export default function MintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MintProvider>{children}</MintProvider>
}

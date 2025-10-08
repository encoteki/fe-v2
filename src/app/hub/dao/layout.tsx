'use client'

import { DaoProvider } from '@/features/dao/context/DaoContext'

export default function DaoLayout({ children }: { children: React.ReactNode }) {
  return <DaoProvider>{children}</DaoProvider>
}

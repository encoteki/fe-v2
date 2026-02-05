'use client'

import { ConnectButton } from '@xellar/kit'
import { ChevronDown, Wallet } from 'lucide-react'
import { useState, useEffect } from 'react'

export const CustomConnectButton = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ConnectButton.Custom>
      {({
        openConnectModal,
        disconnect,
        isConnected,
        openChainModal,
        openProfileModal,
        account,
        chain,
      }) => {
        if (!mounted) {
          return (
            <div
              className="h-10 w-36 animate-pulse rounded-xl bg-gray-200"
              aria-hidden="true"
            />
          )
        }

        return (
          <div>
            {(() => {
              if (!isConnected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="flex h-10 items-center gap-2 rounded-xl bg-black px-4 font-bold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                  >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </button>
                )
              }

              if (!chain) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex h-10 items-center rounded-xl bg-red-500 px-4 font-bold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                  >
                    Wrong Network
                  </button>
                )
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 font-medium text-black transition-all hover:bg-gray-50 hover:shadow-md active:scale-95"
                  >
                    <span className="hidden sm:block">{chain?.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>

                  <button
                    onClick={openProfileModal}
                    type="button"
                    className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 font-medium text-black transition-all hover:bg-gray-50 hover:shadow-md active:scale-95"
                  >
                    {/* Shortened Address */}
                    <span>
                      {account?.address
                        ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
                        : ''}
                    </span>
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

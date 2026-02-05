import { useState, useEffect, useRef } from 'react'
import { useConnection, useSignMessage, useChainId, useDisconnect } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useConnectModal } from '@xellar/kit'
import { CustomConnectButton } from '@/ui/buttons/custom-connect-btn'

export function SignInButton() {
  const { open } = useConnectModal()
  const chainId = useChainId()

  const { address, isConnected } = useConnection()
  const signMessage = useSignMessage()
  const disconnect = useDisconnect()

  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSessionValid, setIsSessionValid] = useState(false)

  const shouldSignRef = useRef(false)

  // Check Session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/session')
        const data = await res.json()
        if (data.isLoggedIn) {
          setIsSessionValid(true)
        }
      } catch (error) {
        console.error('Gagal cek session:', error)
      }
    }
    checkSession()
  }, [])

  // Handle Login (SIWE)
  const handleLogin = async () => {
    try {
      if (!address || !chainId) return
      setIsSigningIn(true)

      // Get Nonce
      const nonceRes = await fetch('/api/nonce')
      const nonce = await nonceRes.text()

      // Create message
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in to Encoteki Beta App',
        uri: window.location.origin,
        version: '1',
        chainId: chainId,
        nonce: nonce,
      })
      const messageToSign = message.prepareMessage()

      // Sign Message
      const signature = await signMessage.mutateAsync({
        message: messageToSign,
      })

      // Verify signature (message <-> signature)
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSign, signature }),
      })

      if (!verifyRes.ok) throw new Error('Failed to verify signature')

      setIsSessionValid(true)
      shouldSignRef.current = false
    } catch (error) {
      console.error('❌ Login Error:', error)
    } finally {
      setIsSigningIn(false)
    }
  }

  // Handle Logout (Disconnect + destroy session)
  const handleLogout = async () => {
    try {
      // Delete session from backend
      await fetch('/api/session', { method: 'DELETE' })

      // Disconnect wallet
      if (isConnected) {
        await disconnect.mutateAsync()
      }

      // Reset State
      setIsSessionValid(false)
      shouldSignRef.current = false
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleClick = () => {
    if (!isConnected) {
      // Wallet not connected yet
      shouldSignRef.current = true
      open()
    } else {
      // Wallet connected, but yet Sign-In with Ethereum
      handleLogin()
    }
  }

  // Auto trigger
  useEffect(() => {
    console.log('State Change:', {
      isConnected,
      address,
      shouldSign: shouldSignRef.current,
    })

    if (isConnected && address && shouldSignRef.current && !isSessionValid) {
      handleLogin()
      shouldSignRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, isSessionValid])

  // IsConnected + IsSessionValid
  if (isSessionValid && isConnected) {
    return (
      <div className="flex items-center gap-2">
        <CustomConnectButton />

        <button
          onClick={handleLogout}
          className="ml-2 rounded-md border border-red-200 px-3 py-1 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isSigningIn}
      className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
    >
      {isSigningIn
        ? 'Signing...'
        : isConnected
          ? 'Sign-In with Ethereum'
          : 'Sign In'}
    </button>
  )
}

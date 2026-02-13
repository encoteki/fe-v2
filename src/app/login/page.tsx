'use client'

import { SignInButton } from '@/ui/buttons/sign-in-btn'
import Image from 'next/image'
import Logo from '@/assets/logos/logo.webp'
import { useUser } from '@/hooks/useUser'
import { useState, useEffect } from 'react'
import { useConnection } from 'wagmi'

export default function SignInPage() {
  const { isLoggedIn, hasReferral, isLoading, mutate } = useUser()
  const { isConnected } = useConnection()

  // State Form
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Auto Reset on Disconnect
  useEffect(() => {
    if (!isConnected) {
      setCode('')
      setErrorMsg('')
    }
  }, [isConnected])

  // Auto Redirect if Eligible (Has Referral)
  useEffect(() => {
    if (isLoggedIn && hasReferral) {
      window.location.href = '/mint'
    }
  }, [isLoggedIn, hasReferral])

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const json = await res.json()

      if (!json.success) {
        throw new Error(json.message)
      }

      await mutate()
      window.location.href = '/mint'
    } catch (err: any) {
      setErrorMsg(err.message)
      setIsSubmitting(false)
    }
  }

  const showLoginForm = !isConnected || !isLoggedIn

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-khaki-90 py-12 sm:px-6 lg:px-8">
      <div className="flex w-full flex-col items-center space-y-4 sm:mx-auto sm:max-w-md">
        <div className="flex flex-col items-center">
          <Image
            src={Logo}
            alt="Encoteki Logo"
            width={64}
            height={64}
            className="mb-4"
            priority
          />
        </div>

        {isLoading ? (
          <div className="flex animate-pulse flex-col items-center gap-2">
            <div className="h-4 w-48 rounded bg-gray-200"></div>
            <div className="mt-2 h-10 w-32 rounded bg-gray-200"></div>
          </div>
        ) : showLoginForm ? (
          <div className="flex flex-col items-center gap-4 text-center duration-300 animate-in fade-in zoom-in">
            <p className="text-sm text-gray-600">
              Connect your wallet to access the beta app
            </p>
            <SignInButton />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-4 px-6 text-center duration-300 animate-in fade-in zoom-in">
            {!hasReferral ? (
              <div className="w-full rounded-lg border border-gray-100 bg-white p-6 shadow">
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Enter Referral Code
                </h3>
                <p className="mb-6 text-sm text-gray-500">
                  You need an invite code to join Encoteki Beta.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="code" className="sr-only">
                      Referral Code
                    </label>
                    <input
                      id="code"
                      name="code"
                      type="text"
                      required
                      placeholder="Referral Code"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      className="block w-full rounded-md border-0 py-2.5 text-center text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-green-600 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>

                  {errorMsg && (
                    <p className="rounded bg-red-50 p-2 text-sm text-red-600">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !code}
                    className="w-full cursor-pointer rounded-4xl bg-primary-green py-3 font-medium text-white duration-300 marker:text-sm hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 md:px-6 md:py-4 md:text-base"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="loading loading-spinner loading-xs"></span>
                        <span>Validating...</span>
                      </div>
                    ) : (
                      'Submit'
                    )}
                  </button>
                  <SignInButton />
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-primary-green">
                  Welcome back! Redirecting...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

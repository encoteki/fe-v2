'use client'

import { useAccount, useEstimateGas, useGasPrice } from 'wagmi'
import { Address, formatEther, encodeFunctionData } from 'viem'

interface TransactionQuoteProps {
  contractAddress: Address
  functionName: string
  abi: any[]
  args: any[]
  value?: bigint
  enabled?: boolean
  tokenSymbol?: string
}

export const TransactionQuote = ({
  contractAddress,
  functionName,
  abi,
  args,
  value = BigInt(0),
  enabled = true,
  tokenSymbol = 'ETH',
}: TransactionQuoteProps) => {
  const { address } = useAccount()
  const { data: gasPrice } = useGasPrice()

  // Encode the function call data
  const data = encodeFunctionData({
    abi,
    functionName,
    args,
  })

  const {
    data: gasUnits,
    error,
    isLoading,
  } = useEstimateGas({
    account: address,
    to: contractAddress,
    data,
    value,
    query: {
      enabled: enabled && !!address && !!gasPrice,
    },
  })

  // 1. Loading State
  if (isLoading || !gasPrice || !gasUnits) {
    return (
      <div className="flex w-full animate-pulse justify-between">
        <p className="text-gray-500">Network Fee</p>
        <div className="h-5 w-20 rounded bg-gray-200" />
      </div>
    )
  }

  // 2. Error State (Transaction will likely fail)
  if (error) {
    return (
      <div className="flex w-full justify-between">
        <p className="text-gray-500">Network Fee</p>
        <p className="text-sm text-red-500">Cannot estimate</p>
      </div>
    )
  }

  // 3. Calculate Total Cost
  // We use BigInt math for precision
  const totalCostWei = gasUnits * gasPrice

  // Add a small buffer (10%) for UI display purposes to be safe
  // const safeCostWei = (totalCostWei * 110n) / 100n

  const totalCostFormatted = formatEther(totalCostWei)

  return (
    <div className="flex w-full justify-between">
      <p className="text-gray-500">Network Fee</p>
      <p className="font-medium text-gray-700">
        ~{parseFloat(totalCostFormatted).toFixed(6)} {tokenSymbol}
      </p>
    </div>
  )
}

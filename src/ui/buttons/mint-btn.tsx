import { useEffect, useState, useMemo } from 'react'
import DefaultButton from '@/ui/buttons/default-btn'
import { useSmartTransaction } from '@/hooks/useSmartTransaction'
import { useMintCtx } from '../../contexts/mint.context'
import { useChainId, useReadContract, useConnection } from 'wagmi'
import { blockExplorerBaseUrls, TSB_ABI } from '@/constants/contracts/addresses'
import {
  Address,
  erc20Abi,
  zeroAddress,
  parseUnits,
  isAddressEqual,
} from 'viem'
import { MintStatus } from '../../enums/mint.enum'

interface MintButtonProps {
  tokenAddress: Address
  price: string // Human readable string (e.g. "0.001" or "1 USDC")
}

export const MintButton = ({ tokenAddress, price }: MintButtonProps) => {
  const { targetContract, setStatus, setHash } = useMintCtx()
  const chainId = useChainId()
  const { address: userAddress } = useConnection()
  const [startAction, setStartAction] = useState(false)

  // A. Check if Native ETH
  const isNative = useMemo(() => {
    return isAddressEqual(tokenAddress, zeroAddress)
  }, [tokenAddress])

  // #1 READ TOKEN DECIMALS (Critical for USDC/USDT)
  const { data: tokenDecimals } = useReadContract({
    address: isNative ? undefined : tokenAddress,
    abi: erc20Abi,
    functionName: 'decimals',
    query: {
      enabled: !isNative, // Only fetch for ERC20
      staleTime: Infinity, // Decimals never change, cache forever
    },
  })

  // #2 CALCULATE CORRECT BIGINT VALUE
  const priceBigInt = useMemo(() => {
    try {
      if (!price) return BigInt(0)

      // CASE 1: Native ETH (Always 18 decimals)
      if (isNative) {
        return parseUnits(price, 18)
      }

      // CASE 2: ERC20 (Wait for decimals to load)
      if (tokenDecimals === undefined) {
        return BigInt(0) // Not ready yet
      }

      // CASE 3: ERC20 with specific decimals (e.g., 6 for USDC)
      return parseUnits(price, tokenDecimals)
    } catch (error) {
      console.error('Error parsing price:', error)
      return BigInt(0)
    }
  }, [price, isNative, tokenDecimals])

  // #3 ALLOWANCE CHECK
  const { data: currentAllowance, refetch: refetchAllowance } = useReadContract(
    {
      address: isNative ? undefined : tokenAddress,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [userAddress as Address, targetContract as Address],
      query: {
        enabled: !isNative && !!userAddress && !!targetContract,
      },
    },
  )

  const needsApproval = useMemo(() => {
    if (isNative) return false
    if (priceBigInt === BigInt(0)) return false
    if (currentAllowance === undefined) return false

    return currentAllowance < priceBigInt
  }, [isNative, currentAllowance, priceBigInt])

  // APPROVE
  const approveTx = useSmartTransaction({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'approve',
    args: [targetContract as Address, priceBigInt], // Use calculated BigInt
    query: {
      enabled: startAction && needsApproval && !isNative && priceBigInt > 0,
    },
  })

  // MINT
  const mintTx = useSmartTransaction({
    abi: TSB_ABI[chainId],
    address: targetContract || ('0x0' as `0x${string}`),
    functionName: 'mint',
    args: [tokenAddress],
    // If native, send value. If ERC20, value is 0.
    value: isNative ? priceBigInt : BigInt(0),
    query: {
      enabled: startAction && !needsApproval && priceBigInt > 0,
    },
  })

  const activeTx = needsApproval ? approveTx : mintTx

  // ---------------------------------------------------------------------------
  // UI Handlers
  // ---------------------------------------------------------------------------
  const onClickConfirm = () => setStartAction(true)

  useEffect(() => {
    if (startAction && activeTx.isSimulationSuccess && !activeTx.isSimulating) {
      activeTx.write()
      setStartAction(false)
    }
  }, [startAction, activeTx])

  useEffect(() => {
    if (needsApproval && approveTx.status === 'success') {
      refetchAllowance()
    }
  }, [approveTx.status, needsApproval, refetchAllowance])

  useEffect(() => {
    if (!needsApproval && activeTx.status === 'success') {
      setStatus(MintStatus.SUCCESS)

      setHash((blockExplorerBaseUrls[chainId] + activeTx.hash) as string)
    }
  }, [activeTx.status, needsApproval, activeTx.hash, chainId])

  const getButtonLabel = () => {
    if (!isNative && tokenDecimals === undefined) return 'Loading Token...'
    if (startAction || activeTx.isSimulating) return 'Preparing...'
    if (activeTx.status === 'signing') return 'Check Wallet...'
    if (activeTx.status === 'processing')
      return needsApproval ? 'Approving...' : 'Minting...'
    if (activeTx.status === 'error') return 'Retry'
    if (!needsApproval && activeTx.status === 'success') return 'Success!'
    return needsApproval ? 'Approve Token' : 'Mint'
  }

  return (
    <div className="flex flex-col gap-4">
      <DefaultButton
        onClick={onClickConfirm}
        disabled={
          startAction ||
          activeTx.isSimulating ||
          (!isNative && tokenDecimals === undefined)
        }
        classname="rounded px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
      >
        {getButtonLabel()}
      </DefaultButton>

      {activeTx.error && (
        <div className="mt-2 text-center text-sm text-red-500">
          {activeTx.error.message.includes('0x02e2ae9e')
            ? `Error: Contract rejected payment (Amount: ${price}).`
            : `Error: ${activeTx.error.shortMessage || activeTx.error.message.slice(0, 50)}...`}
        </div>
      )}
    </div>
  )
}

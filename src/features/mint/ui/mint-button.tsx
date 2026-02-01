import { useEffect, useState } from 'react'
import DefaultButton from '@/shared/ui/buttons/DefaultButton'
import { useSmartTransaction } from '@/hooks/useSmartTransaction'
import { useMintCtx } from '../context/MintContext'
import { useChainId } from 'wagmi'
import { blockExplorerBaseUrls, TSB_ABI } from '@/shared/constants/contracts'

export const MintButton = () => {
  const { targetContract } = useMintCtx()
  const chainId = useChainId()

  const [startMint, setStartMint] = useState(false)

  const { write, status, error, hash, isSimulating, isSimulationSuccess } =
    useSmartTransaction({
      abi: TSB_ABI[chainId],
      address: targetContract || ('0x0' as `0x${string}`),
      functionName: 'mint',
      args: ['0x0000000000000000000000000000000000000000'],
      value: BigInt(0),
      query: {
        enabled: startMint && !!targetContract,
      },
    })

  // 2. Handler Klik Tombol
  const onClickConfirm = () => {
    setStartMint(true)
  }

  // 3. EFFECT: Auto-Write setelah Simulasi Selesai
  useEffect(() => {
    if (startMint && isSimulationSuccess && !isSimulating) {
      console.log('Simulation success, triggering wallet...')
      write()
      setStartMint(false)
    }
  }, [startMint, isSimulationSuccess, isSimulating, write])

  // 4. EFFECT: Error Handling (Reset state jika error)
  useEffect(() => {
    if (error) {
      console.error('Transaction flow failed:', error)
      setStartMint(false)
    }
  }, [error])

  // 5. EFFECT: Success Handling
  useEffect(() => {
    if (status === 'success') {
      console.log('Mint success! Hash:', hash)
    }
  }, [status, hash])

  // Tentukan Label Tombol
  const getButtonLabel = () => {
    if (startMint || isSimulating) return 'Preparing...' // Saat simulasi
    if (status === 'signing') return 'Check Wallet...' // Saat popup wallet muncul
    if (status === 'processing') return 'Minting...' // Saat menunggu blok
    if (status === 'success') return 'Success!'
    if (status === 'error') return 'Retry Mint'
    return 'Mint Now' // Default (Idle)
  }

  // Logic Disable Button
  const isButtonDisabled =
    startMint || // Disable saat preparing
    isSimulating || // Disable saat simulasi
    status === 'signing' || // Disable saat signing
    status === 'processing' || // Disable saat mining
    status === 'success' // Disable jika sudah sukses

  return (
    <div className="flex flex-col gap-4">
      <DefaultButton
        onClick={onClickConfirm}
        disabled={isButtonDisabled}
        classname={`rounded px-4 py-2 text-white transition-all
          ${status === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
          disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        {getButtonLabel()}
      </DefaultButton>

      {/* Tampilan Error Text (Jika tidak pakai Toast) */}
      {error && (
        <div className="mt-2 animate-pulse text-sm text-red-500">
          Error: {error.shortMessage || error.message}
        </div>
      )}

      {/* Tampilan Hash Transaksi */}
      {hash && (
        <a
          href={`${blockExplorerBaseUrls[chainId]}${hash}`} // Sesuaikan network
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-center text-sm text-green-600 hover:underline"
        >
          View on Explorer: {hash.slice(0, 8)}...{hash.slice(-6)}
        </a>
      )}
    </div>
  )
}

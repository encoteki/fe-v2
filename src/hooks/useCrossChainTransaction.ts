import {
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { useLayerZeroScan } from './useLayerZeroScan'

export function useCrossChainTransaction(props: any) {
  // 1. Standard Wagmi Flow
  const simulation = useSimulateContract(props)

  const {
    mutate: writeContract,
    data: sourceHash,
    isPending: isSigning,
    error: writeError,
  } = useWriteContract()

  const sourceReceipt = useWaitForTransactionReceipt({ hash: sourceHash })

  // 2. Trigger LZ Polling only after Source is confirmed
  const isSourceConfirmed = sourceReceipt.isSuccess
  const { lzStatus, dstTxHash } = useLayerZeroScan(
    isSourceConfirmed ? sourceHash : undefined,
  )

  // 3. Derive Global Status
  let status = 'idle'
  if (writeError || sourceReceipt.error) status = 'error'
  else if (isSigning) status = 'signing'
  else if (sourceReceipt.isLoading) status = 'mining_source'
  else if (isSourceConfirmed && lzStatus === 'INFLIGHT')
    status = 'crossing_chain'
  else if (lzStatus === 'DELIVERED') status = 'success'
  else if (lzStatus === 'FAILED' || lzStatus === 'PAYLOAD_STORED')
    status = 'failed_dest'

  return {
    write: () => writeContract(simulation.data!.request),
    sourceHash,
    dstTxHash,
    status, // 'idle' | 'signing' | 'mining_source' | 'crossing_chain' | 'success' | 'failed_dest' | 'error'
    lzStatus,
    isDisabled:
      !simulation.data ||
      isSigning ||
      sourceReceipt.isLoading ||
      lzStatus === 'INFLIGHT',
  }
}

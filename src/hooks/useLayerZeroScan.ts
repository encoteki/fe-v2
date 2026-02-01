import { useState, useEffect } from 'react'

type LzStatus = 'IDLE' | 'INFLIGHT' | 'DELIVERED' | 'FAILED' | 'PAYLOAD_STORED'

export function useLayerZeroScan(sourceHash?: string) {
  const [lzStatus, setLzStatus] = useState<LzStatus>('IDLE')
  const [dstTxHash, setDstTxHash] = useState<string | null>(null)

  useEffect(() => {
    if (!sourceHash) return

    setLzStatus('INFLIGHT')

    const interval = setInterval(async () => {
      try {
        // Note: In production, proxy this through your backend to avoid CORS/Rate-limits
        // Mainnet: https://scan.layerzero-api.com/v1/messages/tx/{hash}
        // Testnet: https://testnet.layerzeroscan.com/api/messages/tx/{hash}
        const response = await fetch(
          `https://scan.layerzero-api.com/v1/messages/tx/${sourceHash}`,
        )
        const data = await response.json()

        const message = data.messages?.[0]

        if (message) {
          if (message.status === 'DELIVERED') {
            setLzStatus('DELIVERED')
            setDstTxHash(message.dstTxHash)
            clearInterval(interval)
          } else if (message.status === 'FAILED') {
            setLzStatus('FAILED')
            clearInterval(interval)
          } else if (message.status === 'PAYLOAD_STORED') {
            // Requires manual retry
            setLzStatus('PAYLOAD_STORED')
            clearInterval(interval)
          }
        }
      } catch (err) {
        console.error('Polling LayerZero failed', err)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [sourceHash])

  return { lzStatus, dstTxHash }
}

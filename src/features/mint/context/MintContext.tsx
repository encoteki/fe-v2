import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { MintStatus } from '../contants/MintEnum'
import { Token } from '@/shared/constants/payments'
import { Address } from 'viem'

type MintContextType = {
  paymentMethod: Token | null
  setPaymentMethod: Dispatch<SetStateAction<Token | null>>

  targetContract: Address | null
  setTargetContract: Dispatch<SetStateAction<Address | null>>

  status: MintStatus
  setStatus: Dispatch<SetStateAction<MintStatus>>

  hash: string | null
  setHash: Dispatch<SetStateAction<string | null>>
}

const MintContext = createContext<MintContextType | undefined>(undefined)

export const MintProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<Token | null>(null)
  const [targetContract, setTargetContract] = useState<Address | null>(null)
  const [status, setStatus] = useState<MintStatus>(MintStatus.HOME)
  const [hash, setHash] = useState<string | null>(null)

  return (
    <MintContext.Provider
      value={{
        paymentMethod,
        setPaymentMethod,
        targetContract,
        setTargetContract,
        status,
        setStatus,
        hash,
        setHash,
      }}
    >
      {children}
    </MintContext.Provider>
  )
}

export const useMintCtx = () => {
  const context = useContext(MintContext)
  if (!context) {
    throw new Error('useMint must be used within a MintProvider')
  }
  return context
}

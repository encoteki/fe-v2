import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { MintStatus } from '../contants/MintEnum'
import { Token } from '@/shared/constants/payments'

type MintContextType = {
  // section: number
  // setSection: Dispatch<SetStateAction<number>>

  // isSufficientFund: boolean
  // setIsSufficientFund: Dispatch<SetStateAction<boolean>>
  // txSuccess: boolean
  // setTxSuccess: Dispatch<SetStateAction<boolean>>
  // hash: any
  // setHash: Dispatch<SetStateAction<any | null>>

  paymentMethod: Token | null
  setPaymentMethod: Dispatch<SetStateAction<Token | null>>

  status: MintStatus | null
  setStatus: Dispatch<SetStateAction<MintStatus | null>>
}

const MintContext = createContext<MintContextType | undefined>(undefined)

export const MintProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [section, setSection] = useState(0)
  // const [isSufficientFund, setIsSufficientFund] = useState(true)
  // const [txSuccess, setTxSuccess] = useState(false)
  // const [hash, setHash] = useState<any | null>(null)

  const [paymentMethod, setPaymentMethod] = useState<Token | null>(null)
  const [status, setStatus] = useState<MintStatus | null>(null)

  return (
    <MintContext.Provider
      value={{
        // section,
        // setSection,
        // isSufficientFund,
        // setIsSufficientFund,
        // txSuccess,
        // setTxSuccess,
        // hash,
        // setHash,
        paymentMethod,
        setPaymentMethod,
        status,
        setStatus,
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

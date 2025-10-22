import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { Status } from '../contants/StatusEnum'

type MintContextType = {
  // paymentMethod: string
  // setPaymentMethod: Dispatch<SetStateAction<string>>
  // section: number
  // setSection: Dispatch<SetStateAction<number>>

  // isSufficientFund: boolean
  // setIsSufficientFund: Dispatch<SetStateAction<boolean>>
  // txSuccess: boolean
  // setTxSuccess: Dispatch<SetStateAction<boolean>>
  // hash: any
  // setHash: Dispatch<SetStateAction<any | null>>

  status: Status | null
  setStatus: Dispatch<SetStateAction<Status | null>>
}

const MintContext = createContext<MintContextType | undefined>(undefined)

export const MintProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [paymentMethod, setPaymentMethod] = useState('')
  // const [section, setSection] = useState(0)
  // const [isSufficientFund, setIsSufficientFund] = useState(true)
  // const [txSuccess, setTxSuccess] = useState(false)
  // const [hash, setHash] = useState<any | null>(null)

  const [status, setStatus] = useState<Status | null>(null)

  return (
    <MintContext.Provider
      value={{
        // paymentMethod,
        // setPaymentMethod,
        // section,
        // setSection,
        // isSufficientFund,
        // setIsSufficientFund,
        // txSuccess,
        // setTxSuccess,
        // hash,
        // setHash,
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

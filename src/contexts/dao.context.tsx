import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { DaoType } from '../enums/dao-types.enum'

type DaoContextType = {
  daoType: DaoType
  setDaoType: Dispatch<SetStateAction<DaoType>>
}

const DaoContext = createContext<DaoContextType | undefined>(undefined)

export const DaoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [daoType, setDaoType] = useState<DaoType>(DaoType.GOVERNANCE)

  return (
    <DaoContext.Provider
      value={{
        daoType,
        setDaoType,
      }}
    >
      {children}
    </DaoContext.Provider>
  )
}

export const useDaoCtx = () => {
  const context = useContext(DaoContext)
  if (!context) {
    throw new Error('useDaoCtx must be used within a DaoProvider')
  }
  return context
}

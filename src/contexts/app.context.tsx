import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

type AppContextType = {
  activeIdx: number | undefined
  setActiveIdx: Dispatch<SetStateAction<number | undefined>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeIdx, setActiveIdx] = useState<number | undefined>(undefined)

  return (
    <AppContext.Provider
      value={{
        activeIdx,
        setActiveIdx,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppCtx = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppCtx must be used within an AppProvider')
  }
  return context
}

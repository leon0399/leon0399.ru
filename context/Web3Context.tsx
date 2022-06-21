import { createContext, FC, useContext } from "react"

interface Context {

}

const Web3Context = createContext<Context>({})

export const CountProvider: FC = ({children}) => {
  const value: Context = {}

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  const context = useContext(Web3Context)

  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }

  return context
}

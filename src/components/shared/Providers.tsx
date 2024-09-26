'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

const SidebarContext = createContext<{
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}>({
  isOpen: false,
  setIsOpen: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const sidebarContextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen],
  )

  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarContext.Provider value={sidebarContextValue}>
        {children}
      </SidebarContext.Provider>
    </QueryClientProvider>
  )
}

export default Providers

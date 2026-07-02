// components/store/StoreProvider.tsx
"use client"

import { StoreContextData } from "@/domains/store/data-loader"
import { createContext, useContext } from "react"


type StoreProviderProps = {
  data: StoreContextData
  children: React.ReactNode
}

const StoreContext = createContext<StoreContextData | null>(null)

export default function StoreProvider({ data, children }: StoreProviderProps) {

  return (
    <StoreContext.Provider value={data}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore(): StoreContextData {
  const storeContext = useContext(StoreContext)
  if (!storeContext) throw new Error("useStore must be inside StoreProvider");
  return storeContext
}

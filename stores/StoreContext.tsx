// components/store/StoreProvider.tsx
"use client"

import { createContext, useContext } from "react"
import { StoreContextData } from "@/lib/store/data-loader"


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

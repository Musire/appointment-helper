// components/store/StoreProvider.tsx
"use client"

import { createContext, useContext } from "react"
import { StoreType } from "@/app/admin/dashboard/page"

export type StoreWithCreator = ({
  createdBy: { email: string };
} & StoreType) 

export type StoreContextValue = {
  store: StoreWithCreator,
  activation: {
    hasConfig: boolean;
    hasActiveStaff: boolean;
    hasServices: boolean;
    isReady: boolean
  } | null
}
const StoreContext = createContext<StoreContextValue | undefined>(undefined)

export default function StoreProvider({ store, activation, children }: StoreContextValue & {children : React.ReactNode}) {

  const context = {
    store,
    activation
  }

  return (
    <StoreContext.Provider value={context}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const storeContext = useContext(StoreContext)
  if (!storeContext) throw new Error("useStore must be inside StoreProvider");
  return storeContext
}

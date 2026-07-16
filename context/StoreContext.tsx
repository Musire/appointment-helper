// components/store/StoreProvider.tsx
"use client"

import { createContext, useContext } from "react";

type StoreProviderData = {
    storeId: string,
  }

type StoreProviderProps = {
  data: StoreProviderData;
  children: React.ReactNode;
}


const StoreContext = createContext<StoreProviderData | null>(null)

export default function StoreProvider({ data, children }: StoreProviderProps) {

  return (
    <StoreContext.Provider value={data}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore(): StoreProviderData {
  const storeContext = useContext(StoreContext)
  if (!storeContext) throw new Error("useStore must be inside StoreProvider");
  return storeContext
}

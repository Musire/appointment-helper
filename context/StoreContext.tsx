// components/store/StoreProvider.tsx
"use client"

import { $Enums } from "@/generated/prisma";
import { createContext, useContext } from "react";

type StoreProviderData = {
    storeId: string,
    categories: {
      id: string;
      name: string;
    }[],
    services: {
      type: $Enums.ServiceType;
      name: string;
      id: string;
      categoryId: string | null;
      durationMin: number;
      priceCents: number;
    }[]
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

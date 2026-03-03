import { prisma } from "@/lib/prisma"
import type { Store } from "@/generated/prisma"
import { unslugify } from "../stringMutate"
import { getStoreState, reconcileStoreStatus, StoreActivationState } from "./store-activation"

export type StoreWithCreator = Store & {
  createdBy: {
    email: string
  } | null
} 

export type StoreContextData = StoreActivationState & {
  store: StoreWithCreator | null
}


export async function getStoreContext(slug: string): Promise<StoreContextData> {
  const name = unslugify(slug)

  const foundStore = await prisma.store.findFirst({
    where: {
      name,
    },
    include: {
      createdBy: {
        select: { email: true },
      },
    },
  })

  if (!foundStore) return {
    store: null,
    requirements: {
      hasConfig: false,
      hasActiveStaff: false,
      hasServices: false
    },
    isReady: false
  };

  const { isReady, requirements } = await getStoreState(foundStore.id)
  const store = await reconcileStoreStatus(foundStore.id, isReady)

  return {
    store,
    requirements,
    isReady
  }
}

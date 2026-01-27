import { prisma } from "@/lib/prisma"
import type { Store } from "@/generated/prisma"
import { unslugify } from "../stringMutate"
import { getStoreActivationState, reconcileStoreStatus, StoreActivationState } from "./store-activation"

export type StoreWithCreator = Store & {
  createdBy: {
    email: string
  }
} 

export type StoreContextData = StoreActivationState & {
  store: StoreWithCreator
}


export async function getStoreContext(slug: string): Promise<StoreContextData | null> {
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

  if (!foundStore) return null;

  const { isReady, requirements } = await getStoreActivationState(foundStore.id)
  const store = await reconcileStoreStatus(foundStore.id, isReady)

  return {
    store,
    requirements,
    isReady
  }
}

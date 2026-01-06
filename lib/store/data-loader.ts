import { prisma } from "@/lib/prisma"
import { getStoreActivationState, StoreActivationState } from "./store-activation"

import type {
  StoreConfig,
  ServiceCategory,
  Service,
  StoreStaff,
  Store,
} from "@/generated/prisma"

export type StoreWithCreator = Store & {
  createdBy: {
    email: string
  }
}

export type StoreContextData = {
  store: StoreWithCreator
  activation: StoreActivationState
  config: StoreConfig | null
  categories: ServiceCategory[]
  services: Service[]
  storeStaff: StoreStaff[]
}


export async function getStoreContext(name: string): Promise<StoreContextData | null> {
  const store = await prisma.store.findFirst({
    where: {
      name,
    },
    include: {
      createdBy: {
        select: { email: true },
      },
    },
  })

  if (!store) {
    return null
  }

  const activation = await getStoreActivationState(store.id)

  const [config, categories, services, storeStaff] = await Promise.all([
    prisma.storeConfig.findUnique({
      where: { storeId: store.id },
    }),
    prisma.serviceCategory.findMany({
      where: { storeId: store.id },
      orderBy: { name: "asc" },
    }),
    prisma.service.findMany({
      where: { storeId: store.id },
    }),
    prisma.storeStaff.findMany({
      where: { storeId: store.id },
    }),
  ])

  return {
    store,
    activation,
    config,
    categories,
    services,
    storeStaff,
  }
}

// lib/store/store-activation.ts
import { prisma } from "@/lib/prisma"
import { StoreWithCreator } from "./data-loader"

export type StoreActivationState = {
  requirements: {
    hasConfig: boolean
    hasActiveStaff: boolean
    hasServices: boolean
  },
  isReady: boolean
}

export async function reconcileStoreStatus(
  storeId: string,
  isReady: boolean
): Promise<StoreWithCreator> {
  return prisma.store.update({
    where: { id: storeId },
    data: {
      status: isReady ? "ACTIVE" : "DRAFT",
    },
    include: {
      createdBy: {
        select: { email: true },
      },
    },
  })
}

export async function getStoreActivationState(storeId: string | undefined): Promise<StoreActivationState> {

  if (!storeId) return {
    requirements: {
      hasConfig: false,
      hasActiveStaff: false,
      hasServices: false,
    },
    isReady: false
  };

  const [config, activeStaffCount, servicesCount] = await Promise.all([
    prisma.storeConfig.findUnique({
      where: { storeId }
    }),
    prisma.storeStaff.count({
      where: {
        storeId,
        status: "ACTIVE"
      }
    }),
    prisma.service.count({
      where: {
        storeId,
      }
    })
  ])

  const hasConfig = Boolean(config)
  const hasActiveStaff = activeStaffCount > 0
  const hasServices = servicesCount > 0

  const requirements = {
    hasConfig,
    hasActiveStaff,
    hasServices
  }

  return {
    requirements,
    isReady: Object.values(requirements).every(r => Boolean(r))
  }
}



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

// compute if store has configuration setup, has active staff, and has services setup
async function deriveStoreState(storeId: string) {
  const [hasConfig, hasActiveStaff, hasServices] = await Promise.all([
    prisma.storeConfig.findUnique({ where: { storeId } })
      .then(Boolean),

    prisma.storeStaff.count({
      where: { storeId, status: "ACTIVE" },
    }).then(count => count > 0),

    prisma.service.count({
      where: { storeId },
    }).then(count => count > 0),
  ]);

  return {
    hasConfig,
    hasActiveStaff,
    hasServices,
  };
}

export async function getStoreState(storeId: string | undefined): Promise<StoreActivationState> {

  if (!storeId) return {
    requirements: {
      hasConfig: false,
      hasActiveStaff: false,
      hasServices: false,
    },
    isReady: false
  };

  const requirements =  await deriveStoreState(storeId)

  return {
    requirements,
    isReady: (
      requirements.hasConfig &&
      requirements.hasActiveStaff &&
      requirements.hasServices
    )
  }
}



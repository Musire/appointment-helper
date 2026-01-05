// lib/store/store-activation.ts
import { prisma } from "@/lib/prisma"

export async function getStoreActivationState(storeId: string | undefined) {

  if (!storeId) return null;

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

  return {
    hasConfig: Boolean(config),
    hasActiveStaff: activeStaffCount > 0,
    hasServices: servicesCount > 0,
    isReady:
      Boolean(config) &&
      activeStaffCount > 0 &&
      servicesCount > 0
  }
}

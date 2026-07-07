import { createSafeAction } from "@/domains/identity/auth/safeAction"
import { prisma } from "../../../lib/prisma"
import { getStoreOfferings } from "@/features/booking/services/booking.services"

export async function getStoreService(storeId: string) {
  try {
    return await prisma.service.findMany({
      where: { storeId },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Failed to fetch store services")
  }
}


export const getStoreServices = createSafeAction(
  {
    allowedRoles: ['USER']
  },
  getStoreOfferings
)
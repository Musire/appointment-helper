import { createSafeAction } from "@/domains/identity/auth/safeAction"
import { prisma } from "@/lib/prisma"
import { getStoresService } from "../services/getStoresService"


export const getStores = createSafeAction(
    {
        allowedRoles: ['USER']
    },
    getStoresService
)




export async function getActiveStores() {
  const stores = await prisma.store.findMany({
    where: {
      status: 'ACTIVE'
    },
    select: {
      id: true,
      name: true,
      description: true,
    }
  })

  return stores
}

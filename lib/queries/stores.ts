import { getCurrentUser } from "@/app/actions/auth.actions"
import { prisma } from "@/lib/prisma"

export async function getStores() {
  const user = await getCurrentUser()
  if (!user) return []

  const stores = await prisma.storeStaff.findMany({
    where: { userId: user.id },
    select: {
      store: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  if (!stores) return []

  const storesOnly = stores.map(s => s.store)
  return storesOnly
  
}

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

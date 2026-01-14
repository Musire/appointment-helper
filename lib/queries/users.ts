import { prisma } from "@/lib/prisma"
import { unslugify } from "@/lib/stringMutate"

export async function getInvitableStaffUsers(storeSlug: string) {
  const storeName = unslugify(storeSlug)

  const store = await prisma.store.findUnique({
    where: { name: storeName },
    select: { id: true },
  })

  if (!store) return []

  return prisma.user.findMany({
    where: {
      roles: {
        some: {
          role: { name: "STAFF" },
        },
      },
      // Never invited to this store (any status)
      invites: {
        none: {
          storeId: store.id,
        },
      },
    },
    select: {
      id: true,
      email: true,
      fullName: true,
    },
  })
}

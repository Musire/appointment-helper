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

export function getStoreFromSlug(storeSlug: string) {
  return prisma.store.findFirst({
    where: {
      name: unslugify(storeSlug)
    }    
  })

}

export async function getStoreStaff(storeSlug: string) { 
  const store = await getStoreFromSlug(storeSlug)
  if (!store) return []

  const staff = await prisma.storeStaff.findMany({
    where: { storeId: store.id },
    select: {
      role: true,
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  })
   
  if (!staff) return []

  const flatStaff = staff.map(({ role, user }) => ({
    id: user.id,
    name: user.fullName,
    email: user.email,
    role,
  }))

  return flatStaff
}

export async function getActiveStaff() {
  const staff = await prisma.staffProfile.findMany({
    where: {
      active: true
    },
    select: {
      bio: true,
      user: {
        select: {
          id: true,
          email: true,
          fullName: true
        }
      }
    }
  })

  const flattened = staff.map(({bio, user}) => {
    if (!bio) return {bio: null, ...user}
    return {bio, ...user}
  })

  return flattened
}
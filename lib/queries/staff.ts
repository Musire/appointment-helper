import { prisma } from "@/lib/prisma"

export async function getStoreStaff(storeId: string) {
  const data = await prisma.storeStaff.findMany({
    where: { storeId },
    select: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          createdAt: true,
          staff: {
            select: {
              bio: true,
            },
          },
        },
      },
    },
  })

  return data.map((item) => ({
    id: item.user.id,
    fullName: item.user.fullName,
    email: item.user.email,
    bio: item.user.staff?.bio ?? null,
    createdAt: item.user.createdAt,
  }))
}
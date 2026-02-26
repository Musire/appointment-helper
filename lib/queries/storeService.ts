import { prisma } from "../prisma"

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
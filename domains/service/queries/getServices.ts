import { prisma } from "@/lib/prisma"

export async function getServices(storeId: string) {

  const categories = await prisma.serviceCategory.findMany({
    where: { storeId },
    select: {
        id: true,  
        name: true,
    }
  })

  const services = await prisma.service.findMany({
    where: { storeId },
    select: {
        id: true, 
        categoryId: true,
        name: true,
        durationMin: true,
        priceCents: true,
        type: true
    }
  })

  return {
    categories: categories ?? [],
    services: services ?? []
  }
  
}

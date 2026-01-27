import { prisma } from "@/lib/prisma"
import { unslugify } from "../stringMutate"

export async function getServices(slug: string) {

  const store = await prisma.store.findUnique({
    where: {
      name: unslugify(slug)
    }
  })

  if (!store) return { categories: [], services: []}

  const categories = await prisma.serviceCategory.findMany({
    where: { storeId: store.id },
    select: {
        id: true,  
        name: true,
    }
  })

  const services = await prisma.service.findMany({
    where: { storeId: store.id },
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

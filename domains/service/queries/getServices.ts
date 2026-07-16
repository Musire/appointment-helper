import { prisma } from "@/lib/prisma"

export async function getServices(storeId: string) {

  const services = await prisma.service.findMany({
    where: { storeId },
    select: {
        id: true, 
        name: true,
        price: true,
    }
  })

  return services ?? []
  
}

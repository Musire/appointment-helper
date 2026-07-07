import { prisma } from "@/lib/prisma"


export const StoreServiceRepository = {
    async getStoreOfferings(storeId: string) {
        return await prisma.service.findMany({
        where: { storeId },
        })
    }
}
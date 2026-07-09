import { prisma } from "@/lib/prisma"

export const  storeRepository = {
    async findStoresByUserId() {
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
}
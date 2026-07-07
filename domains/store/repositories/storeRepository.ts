import { Store, StoreStatus } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"

export const  storeRepository = {
    async findStoresByUserId() {
        const stores: Store[] = await prisma.store.findMany({
            where: { status: StoreStatus.ACTIVE },
        })

        return stores
    }
}
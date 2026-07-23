import { serviceSchemaType } from "@/domains/service/validation/service.schema"
import { prisma } from "@/lib/prisma"


export const StoreServiceRepository = {
    async getStoreOfferings(storeId: string) {
        return await prisma.service.findMany({
        where: { storeId },
        })
    },
    async upsertOfferings(serviceData: serviceSchemaType) {
        const {storeId, name, price} = serviceData
        await prisma.service.upsert({
            where: {
                storeId_name: {
                storeId,
                name,
                },
            },
            update: {
                price,
            },
            create: {
                storeId,
                name,
                price,
            },
        });
    }
}
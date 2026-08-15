import { serviceSchemaType } from "@/domains/service/validation/service.schema"
import { prisma } from "@/lib/prisma"


export const StoreServiceRepository = {
    async getStoreOfferings(storeId: string) {
        return await prisma.service.findMany({
            where: { storeId },
        });
    },

    // Function 1: Find
    async findServiceById(id: string) {
        return await prisma.service.findUnique({
            where: { id },
        });
    },

    // Function 2: Update
    async updateService(id: string, data: Omit<serviceSchemaType, 'id'>) {
        return await prisma.service.update({
            where: { id },
            data: {
                name: data.name,
                price: data.price,
            },
        });
    },

    // Function 3: Create
    async createService(data: serviceSchemaType) {
        return await prisma.service.create({
            data: {
                storeId: data.storeId,
                name: data.name,
                price: data.price,
            },
        });
    },
}
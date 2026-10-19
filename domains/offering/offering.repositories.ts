import { Service } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"

export const ServiceRepository = {
    async editService(serviceId: string, updatedData: Partial<Service>) {
        return await prisma.service.update({
            where: {
                id: serviceId
            },
            data: updatedData
        })
    },
    async deleteService(serviceId: string) {
        return await prisma.service.delete({
            where: {
                id: serviceId
            }
        })
    }
}

import { prisma } from "@/lib/prisma"

export async function getServices (storeId: string) {
    try {
        const serviceCategories = await prisma.serviceCategory.findMany({
            where: {
                storeId
            },
            select: {
                services: {
                    select: {
                        id: true,
                        name: true,
                        durationMin: true,
                        priceCents: true
                    }
                }
            }
        })

        const flattened = serviceCategories.flatMap(item => item.services)

        return {
            success: true,
            error: null,
            data: flattened
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}
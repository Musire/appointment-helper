import { prisma } from "@/lib/prisma"


export async function getStores () {
    try {
        const found = await prisma.store.findMany()

        return {
            success: true,
            error: null,
            data: found
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}
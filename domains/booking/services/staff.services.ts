import { prisma } from "@/lib/prisma"


export async function getStoreStaff (storeId: string) {
    try {
        const data = await prisma.storeStaff.findMany({
            where: { storeId },
            select: {
                user: true,
            }
        })

        const flattened = data.map(item => item.user)

        console.log(flattened)

        return {
            sucess: true,
            data: flattened, 
            error: null
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}
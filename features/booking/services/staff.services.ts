import { prisma } from "@/lib/prisma"


export async function getStoreStaffService (storeId: string) {
    const data = await prisma.storeStaff.findMany({
        where: { storeId },
        select: {
            user: true,
        }
    })

    return data.map(item => item.user)
}
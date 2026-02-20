import { prisma } from "@/lib/prisma";


export async function retrieveStaffStore (storeId: string) {
    try {
        const found = await prisma.storeStaff.findMany({
            where: { storeId },
            select: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true
                    }
                }
            }
        })

        const flattened = found.map(i => i.user)

        return {
            success: true,
            error: null,
            data: flattened
        }

    } catch (error) {
        console.error(error)
        return {
            success: false,
            data: null,
            error: "Failed to retrieve staff"
        }
    }
}
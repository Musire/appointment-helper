import { prisma } from "@/lib/prisma";


export const StaffRepository = {
    async getAvailableStaff(storeId: string) {
        const availableStaff = await prisma.user.findMany({
            where: {
                // Must have STAFF role
                roles: {
                    some: {
                        role: {
                            name: "STAFF",
                        },
                    },
                },
                // staff: {
                //     is: {
                //         active: true,
                //     },
                // },
                // storeStaff: {
                //     none: {
                //         storeId: storeId,
                //     },
                // },
            },
            select: {
                id: true,
                email: true,
                fullName: true,
            },
        });

        return availableStaff
    }
} 
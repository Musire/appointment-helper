import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { StoreStaffType } from "./availability.validations";


export const AvailabilityRepository = {
    async getStoreAvailability (storeStaffId: string) {
        const availability = await prisma.staffAvailability.findMany({
            where: { storeStaffId }
        })
        return availability
    }
}

export const StoreStaffRepository = {
    async getStoreStaff (data: StoreStaffType) {
        const storeStaff = await prisma.storeStaff.findFirst({
            where: data
        })
        return storeStaff
    },
    async saveStoreAvailability (records: Prisma.StaffAvailabilityCreateManyInput[], storeStaffId: string) {
        return prisma.$transaction(async (tx) => {
            await tx.staffAvailability.deleteMany({
                where: { storeStaffId },
            });

            if (records.length) {
                await tx.staffAvailability.createMany({
                    data: records,
                });
            }

            return tx.staffAvailability.findMany({
                where: { storeStaffId },
                orderBy: [
                    { dayOfWeek: 'asc' },
                    { startTime: 'asc' },
                ],
            });
        });
    }
}
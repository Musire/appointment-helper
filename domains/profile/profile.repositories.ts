import { prisma } from "@/lib/prisma";

export const ProfileRepository = {
    async getStaffProfileStatus(staffId: string) {
        const [
            profile,
            activeAffiliations,
        ] = await Promise.all([
            prisma.staffProfile.findUnique({
                where: {
                    userId: staffId,
                },
                select: {
                    bio: true,
                    active: true,
                },
            }),

            prisma.storeStaff.findMany({
                where: {
                    userId: staffId,
                    status: "ACTIVE",
                    store: {
                        status: "ACTIVE",
                    },
                },
                select: {
                    id: true,
                    storeId: true,
                    availability: {
                        select: {
                            id: true,
                        },
                    },
                },
            }),
        ]);

        return {
            bioCompleted: Boolean(profile?.bio?.trim()),
            profileActive: profile?.active ?? false,

            hasActiveStore: activeAffiliations.length > 0,

            hasAvailability: activeAffiliations.some(
                affiliation => affiliation.availability.length > 0
            ),
        };
    },

    async getStoreProfileStatus(storeId: string) {
        const [
            store,
            activeMembers,
            listedServices,
        ] = await Promise.all([
            prisma.store.findUnique({
                where: {
                    id: storeId,
                },
                select: {
                    status: true,
                },
            }),

            prisma.storeStaff.count({
                where: {
                    storeId,
                    status: "ACTIVE",
                },
            }),

            prisma.service.count({
                where: {
                    storeId,
                    isListed: true,
                },
            }),
        ]);

        return {
            storeActive: store?.status === "ACTIVE",
            hasActiveMember: activeMembers > 0,
            hasListedService: listedServices > 0,
        };
    },
};

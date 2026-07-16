import { prisma } from "@/lib/prisma"
import { StoreHoursInput } from "../schemas/store.schema"

export const  storeRepository = {
    async findStoresByUserId() {
        const stores = await prisma.store.findMany({
            where: {
                status: 'ACTIVE'
            },
            select: {
                id: true,
                name: true,
                description: true,
            }
        })

        return stores
    },
    async updateStoreHours(storeId: string, hours: StoreHoursInput) {
        const updatedStore = await prisma.store.update({
            where: { id: storeId },
            data: {
                config: {
                    upsert: {
                        create: {
                            hours: {
                                createMany: {
                                    data: hours.map((row) => ({
                                        id: row.id,
                                        label: row.label,
                                        isActive: row.isActive,
                                        start: row.start,
                                        end: row.end,
                                    })),
                                },
                            },
                        },
                        update: {
                            hours: {
                                deleteMany: {}, 
                                createMany: {
                                    data: hours.map((row) => ({
                                        id: row.id,
                                        label: row.label,
                                        isActive: row.isActive,
                                        start: row.start,
                                        end: row.end,
                                    })),
                                },
                            },
                        },
                    },
                },
            },
            select: {
                config: {
                    select: {
                        id: true,
                        hours: {
                            select: {
                                id: true,
                                label: true,
                                isActive: true,
                                start: true,
                                end: true
                            }
                        }
                    }
                }
            }
        });

        return updatedStore.config;
    },
    async getStoreHours(storeId: string) {
        const config = await prisma.storeConfig.findUnique({
            where: { storeId },
            select: {
                hours: {
                    select: {
                        id: true,
                        label: true,
                        isActive: true,
                        start: true,
                        end: true
                    }
                }
            }
        });

        return config?.hours ?? [];
    }
}
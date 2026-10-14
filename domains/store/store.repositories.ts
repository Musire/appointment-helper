import { StoreStatus } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"
import { StoreUpdateType } from "@/validation/StoreCreation.schema"
import { defaultHours } from "./store.types"
import { StoreCreationType, StoreDetailsType, StoreHoursInput } from "./store.validations"

export const  storeRepository = {
    async findStoresByUserId() {
        const stores = await prisma.store.findMany({
            where: {
                status: 'ACTIVE'
            },
            select: {
                id: true,
                name: true,
                address: true,
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
    },
    async countServices(storeId: string): Promise<number> {
        const cleanStoreId = storeId.trim();
        return prisma.service.count({
            where: { storeId: cleanStoreId }
        });
    },
    async countStoreDays(storeId: string): Promise<number> {
        return prisma.storeHour.count({
            where: {
                isActive: true,
                storeConfig: {
                    store: {
                        id: storeId
                    }
                }
            }
        });
    },
    async findStoreWithStatus(storeId: string) {
        return prisma.store.findUnique({
            where: { id: storeId },
            select: { name: true, address: true, status: true }
        });
    },
    async countStaff(storeId: string) {
        return 0
    },
    async countInvites(storeId: string) {
        return 0
    },
    async updateStoreStatus(storeId: string, status: StoreStatus) {
        return prisma.store.update({
            where: { id: storeId },
            data: { status },
            select: { name: true, address: true, status: true }
        });
    },
    async findStore(storeId: string) {
        return await prisma.store.findUnique({
            where: {
                id: storeId
            }
        })
    },
    async createStore({data, defaultHours, id}: {data: StoreCreationType, defaultHours: defaultHours, id: string}) { 
        const store = await prisma.store.create({
            data: {
                name: data.name,
                address: data.address,
                createdById: id,
                config: {
                    create: {
                        hours: {
                            createMany: {
                                data: defaultHours
                            }
                        }
                    }
                }
            }
        })
        return store
    },
    async updateStore (data: StoreUpdateType) {
        const store = await prisma.store.updateMany({
            where: { id: data.id },
            data: {
                name: data.name,
                address: data.address
            }
        })
        return store
    },
    async getStoreDetails (data: StoreDetailsType) {
        const store = await prisma.store.findFirst({
            where: { id: data.storeId},
            select: {
                id: true,
                name: true,
                address: true,
            }
        })
        return store
    }
}
import { StoreStatus } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"
import { unslugify } from "@/lib/utils/stringMutate"
import { StoreUpdateType } from "@/validation/StoreCreation.schema"
import { defaultHours } from "./store.types"
import { saveBusinessHoursType, StoreCreationType, StoreDetailsType, storeHoursUpdateType } from "./store.validations"

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
    async updateStoreHours(data: storeHoursUpdateType) {
        const updatedStore = await prisma.store.update({
            where: { id: data.storeId },
            data: {
                config: {
                    upsert: {
                        create: {
                            hours: {
                                createMany: {
                                    data: data.hoursList.map((row) => ({
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
                                    data: data.hoursList.map((row) => ({
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
    },
    async saveBusinessHours (data: saveBusinessHoursType) {

    },
    async getInvitableStaff (storeId: string) {
        const staff = await prisma.user.findMany({
            where: {
                roles: {
                    some: {
                        role: { name: "STAFF" },
                    },
                },
                invites: {
                    none: {
                        storeId: storeId,
                    },
                },
            },
            select: {
                id: true,
                email: true,
                fullName: true,
            },
        })
        return staff
    },
    async getStoreByName(storeName: string){
        const store = await prisma.store.findUnique({
            where: { name: storeName },
            select: { id: true },
        })
        return store
    },
    async getStoreFromSlug(storeSlug: string) {
        const store = await prisma.store.findFirst({
            where: {
              name: unslugify(storeSlug)
            }    
        })
        return store
    },
    async getStoreStaff (storeId: string) {
        const staff = await prisma.storeStaff.findMany({
            where: { storeId },
            select: {
              role: true,
              user: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                },
              },
            },
        })

        return staff.map(({ role, user }) => ({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role,
        }))
    },
    async getActiveStaff() {
        const staff = await prisma.staffProfile.findMany({
            where: {
                active: true
            },
            select: {
                bio: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true
                    }
                }
            }
        })

        return staff.map(({bio, user}) => {
            if (!bio) return {bio: null, ...user}
            return {bio, ...user}
        })
    }, 
    async getActiveStores () {
        const stores = await prisma.store.findMany({
            where: {
                status: 'ACTIVE'
            }
        })
        return stores
    },
    async getStaffStores (staffId: string ) {
        return prisma.storeStaff.findMany({
            where: {
                userId: staffId,
                status: "ACTIVE",
                store: {
                    status: "ACTIVE",
                },
            },
            select: {
                store: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

}
import { createSafeAction } from "@/domains/auth/util/safeAction";
import { getStoreOfferings } from "@/features/booking/services/booking.services";
import { StoreConfig } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getStoreHoursService, StoreService } from "./store.services";

export type StoreConfigResult =
  | { status: "STORE_NOT_FOUND" }
  | { status: "CONFIG_MISSING"; storeId: string }
  | { status: "OK"; storeId: string; config: StoreConfig };


export const getStoreHours = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    getStoreHoursService
)


export const getStoreStatus = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    async(storeId: string) => {
        const [storeInfo, metrics] = await Promise.all([
            StoreService.syncStoreStatus(storeId),
            StoreService.getDashboardMetrics(storeId),
        ]);

        return { storeInfo, metrics }
    }
)



// INCOMPLETE QUERY FUNCTIONS


export async function getStoreConfig(storeId: string): Promise<StoreConfigResult> {
    const store = await prisma.store.findUnique({
        where: { id: storeId },
        select: { id: true },
    });

    if (!store) {
        return { status: "STORE_NOT_FOUND" };
    }

    const config = await prisma.storeConfig.findUnique({
        where: { storeId: store.id },
    });

    if (!config) {
        return { status: "CONFIG_MISSING", storeId: store.id };
    }

    return {
        status: "OK",
        storeId: store.id,
        config,
    };
}

export async function getStoreService(storeId: string) {
  try {
    return await prisma.service.findMany({
      where: { storeId },
    })
  } catch (error) {
    console.error(error)
    throw new Error("Failed to fetch store services")
  }
}


export async function getStoreStaff(storeId: string) {
  const data = await prisma.storeStaff.findMany({
    where: { storeId },
    select: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          createdAt: true,
          staff: {
            select: {
              bio: true,
            },
          },
        },
      },
    },
  })

  return data.map((item) => ({
    id: item.user.id,
    fullName: item.user.fullName,
    email: item.user.email,
    bio: item.user.staff?.bio ?? null,
    createdAt: item.user.createdAt,
  }))
}


// MISC - FUNCTIONS 
export const getStoreServices = createSafeAction(
  {
    allowedRoles: ['USER']
  },
  getStoreOfferings
)
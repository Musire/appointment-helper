'use server'

import { createSafeAction, validateSchema } from "@/domains/auth/util/safeAction";
import { prisma } from "@/lib/prisma";
import { getStoreOfferings } from "../booking/booking.services";
import { getActiveStoresService, getDashboardMetrics, getInvitableStaffService, getStaffStoreService, getStoreHoursService, storeDetailsService, syncStoreStatus } from "./store.services";
import { StoreConfigResult } from "./store.types";
import { invitableStaffSchema, invitableStaffType, StoreDetailsSchema, StoreDetailsType } from "./store.validations";



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
            syncStoreStatus(storeId),
            getDashboardMetrics(storeId),
        ]);

        return { storeInfo, metrics }
    }
)


export const getStoreDetails = createSafeAction(
  {
    allowedRoles: ['ADMIN', 'admin']
  },
  async (input: StoreDetailsType) => {
    const validated = validateSchema(StoreDetailsSchema, input)
    const res = storeDetailsService(validated)
    return res
  }
)

export const getActiveStores = createSafeAction(
  {
    allowedRoles: ['ADMIN', 'admin']
  }, 
  getActiveStoresService
)

export const getStaffStores = createSafeAction(
  {
    allowedRoles: ['STAFF', 'staff']
  },
  getStaffStoreService
)


// STORE-STAFF FUNCTIONS

export const getInvitableStaffUsers = createSafeAction(
  {
    allowedRoles: ['ADMIN', 'admin']
  },
  async (input: invitableStaffType) => {
    const validated = validateSchema(invitableStaffSchema, input)
    const res = getInvitableStaffService(validated)
    return res
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
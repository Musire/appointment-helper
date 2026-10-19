import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { StaffDatetimeRepository, StoreServiceRepository } from "./booking.repositories";
import { convertUTC } from "@/lib/utils/time";
import { prisma } from "@/lib/prisma";
import { inputType, ReviewInput } from "./booking.types";
dayjs.extend(utc)

// BOOKING SERVICE FUNCTIONS


export async function createBooking({ 
    storeId, 
    staffId, 
    userId, 
    startTime, 
    serviceIds }: inputType) {
    try {
        const services = Array.isArray(serviceIds)
            ? serviceIds
            : [serviceIds]

        const start = dayjs.utc(startTime)
        const end = start.add(60, "minute")

        const appointment = { start, end, services }

        // const appointment = await prisma.appointment.create({
        //     data: {
        //         store: { connect: { id: storeId } },
        //         staff: { connect: { id: staffId } },
        //         client: { connect: { id: userId } },
        //         startTime: start.toDate(),
        //         endTime: end.toDate(),
        //         status: "CONFIRMED",
        //         items: {
        //             create: services.map((id) => ({
        //                 service: { connect: { id } }
        //             }))
        //         }
        //     },
        //     select: {
        //         id: true,
        //         startTime: true,
        //         endTime: true,
        //         status: true,
        //         items: {
        //         select: {
        //             service: {
        //             select: {
        //                 name: true,
        //                 priceCents: true
        //             }
        //             }
        //         }
        //         }
        //     }
        // })
        
        return {
            success: true,
            error: null,
            data: appointment
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getStoreOfferings (storeId: string) {
    return StoreServiceRepository.getStoreOfferings(storeId)
}


// DATETIME SERVICE FUNCTIONS


export async function getDatetimeService (storeId: string, staffId: string, targetDate: Date): Promise<{ id: string; time: string; }[]> { 
  const availability = await StaffDatetimeRepository.getAvailability(storeId, staffId, targetDate) ?? []; 
  const blocked = await StaffDatetimeRepository.getBlocked(staffId, targetDate) ?? [];
  const booked = await StaffDatetimeRepository.getBooked(staffId, targetDate) ?? [];
  
  const unavailable = new Set([...blocked, ...booked]);
  
  return availability
    .filter(slot => !unavailable.has(slot))
    .map(slot => ({ id: crypto.randomUUID(), time: slot })); 
}

// REVIEW SERVICE FUNCTIONS



export async function generateReviewState (input: ReviewInput) {
    const { store, staff, dateTime, services } = input
    try {
        const [Store, Staff, Services] = await Promise.all([
            prisma.store.findUnique({ where: { id: store } }),
            prisma.user.findUnique({ where: { id: staff } }),
            prisma.service.findUnique({ where: { id: services } })
        ])

        if (!Store) {
            return { success: false, error: 'STORE_NOT_FOUND', data: null }
        }

        if (!Staff) {
            return { success: false, error: 'STAFF_NOT_FOUND', data: null }
        }

        if (!Services) {
            return { success: false, error: 'SERVICE_NOT_FOUND', data: null }
        }

        const { date, time } = convertUTC(dateTime, 'America/Guatemala')

        return {
            success: true,
            error: null,
            data: {
                store: Store,
                staff: Staff,
                services: Services,
                date,
                time
            }
        }
    } catch (error) {
        console.error(error)
        throw error
    }

}


// STAFF SERVICE FUNCTIONS

export async function getStoreStaffService (storeId: string) {
    const data = await prisma.storeStaff.findMany({
        where: { storeId },
        select: {
            user: true,
        }
    })

    return data.map(item => item.user)
}

// STORE SERVICE FUNCTIONS


export async function getStores () {
    try {
        const found = await prisma.store.findMany()

        return {
            success: true,
            error: null,
            data: found
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

// STORE-STAFF FUNCTIONS


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
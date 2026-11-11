import { prisma } from "@/lib/prisma";
import { convertUTC } from "@/lib/utils/time";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AppointmentRepository } from "../appointments/appointment.repositories";
import { AvailabilityRepository, StoreStaffRepository } from "../availability/availability.repositories";
import { filterBookedSlots, generateTimeGrid, getDayOfWeek } from "../availability/availability.utils";
import { BookingRepository, StoreServiceRepository } from "./booking.repositories";
import { inputType, ReviewInput } from "./booking.types";
import { CreateBookingType, DateTimeStepType } from "./booking.validations";
import { getPrismaUserId } from "../auth/util/session";
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


export async function getDatetimeService (data: DateTimeStepType) {
    const { storeId, staffId, targetDate } = data

    const dayOfWeek =  getDayOfWeek(targetDate.toISOString())
    const storeStaff = await StoreStaffRepository.getStoreStaff({ storeId, userId: staffId })

    if (!storeStaff) throw new Error ('staff member not associated with a store')

    const availability = await AvailabilityRepository.getStaffAvailability({
        storeStaffId: storeStaff.id,
        dayOfWeek
    })

    if (!availability) return []


    const booked = await AppointmentRepository.getStaffAppointmentsByDate({
        staffId,
        date: targetDate
    })
    
    const slots = generateTimeGrid(availability.startTime, availability.endTime)
    const free = filterBookedSlots(slots, booked)

    return free
}

export async function getReviewDataService (data: CreateBookingType) {
   return  BookingRepository.getReviewData(data)
}

export async function createBookingService (data: CreateBookingType) {
    const userId = await getPrismaUserId()
    if (!userId) throw new Error('User not found in prisma')
    return BookingRepository.createBooking({ data, userId })
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
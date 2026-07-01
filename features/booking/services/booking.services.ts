import { prisma } from "@/lib/prisma"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

type inputType = {
    storeId: string;
    staffId: string;
    userId: string;
    startTime: string;
    serviceIds: string[];
}

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
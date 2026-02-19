import { Service, StaffAvailability, Store, User } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { convertUTC } from "@/lib/time";

type ReviewInput = {
  store: string;
  staff: string;
  dateTime: string;
  services: string;
}


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
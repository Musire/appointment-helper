import { StaffDatetimeRepository } from "../respositories/StaffDatetimeRepository";


export async function getDatetimeService (storeId: string, staffId: string, targetDate: Date) {
    const availability = await StaffDatetimeRepository.getAvailability(storeId, staffId,  targetDate)
    const blocked = await StaffDatetimeRepository.getBlocked(staffId, targetDate)
    const booked = await StaffDatetimeRepository.getBooked(staffId, targetDate)

    const unavailable = new Set([...blocked, ...booked])
    const freeSlots = availability.filter(slot => !unavailable.has(slot))

    return freeSlots

}
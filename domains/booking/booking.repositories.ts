import { DayOfWeek } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { serviceSchemaType } from "../service/validation/service.schema";
import { CreateBookingType } from "./booking.validations";


const getUTCDayName = (date: Date) => {
    const days: DayOfWeek[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return days[date.getDay()];
};

function generateHourlySlots(
  startTime: number,
  endTime: number,
): string[] {
  const slots: string[] = [];

  const startHour = Math.ceil(startTime / 60);
  const endHour = Math.floor(endTime / 60);

  for (let hour = startHour; hour <= endHour; hour++) {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedHour = String(displayHour).padStart(2, '0');

    slots.push(`${formattedHour}:00 ${ampm}`);
  }

  return slots;
}

export const StaffDatetimeRepository = {
    async getAvailability(storeId: string, staffId: string, targetDate: Date): Promise<string[]>  {
        const targetDay = getUTCDayName(targetDate)
        
        const availability = await prisma.staffAvailability.findFirst({
            where: {
                dayOfWeek: targetDay,
                storeStaff: {
                    userId: staffId,
                    storeId: storeId
                }
            }
        });

        if (!availability) {
            return [];
        }

        return generateHourlySlots(availability.startTime, availability.endTime)
    },
    async getBlocked(staffId: string, targetDate: Date): Promise<string[]> {
        return []
    },
    async getBooked(staffId: string, targetDate: Date): Promise<string[]>  {
        return []
    }
}



export const StoreServiceRepository = {
    async getStoreOfferings(storeId: string) {
        return await prisma.service.findMany({
            where: { storeId },
        });
    },

    // Function 1: Find
    async findServiceById(id: string) {
        return await prisma.service.findUnique({
            where: { id },
        });
    },

    // Function 2: Update
    async updateService(id: string, data: Omit<serviceSchemaType, 'id'>) {
        return await prisma.service.update({
            where: { id },
            data: {
                name: data.name,
                price: data.price,
            },
        });
    },

    // Function 3: Create
    async createService(data: serviceSchemaType) {
        return await prisma.service.create({
            data: {
                storeId: data.storeId,
                name: data.name,
                price: data.price,
            },
        });
    },
}

export const BookingRepository = {
    async getReviewData (data: CreateBookingType) {
        const { storeId, staffId, serviceIds, date, time } = data;
        
        
        const [store, staff, services] = await Promise.all([
            prisma.store.findUnique({
                where: { id: storeId },
            }),
            prisma.user.findUnique({
                where: { id: staffId },
            }),
            prisma.service.findMany({
                where: {
                    id: {
                        in: serviceIds
                    }
                }
            }),
        ]);
        
    
        return { store, staff, services, date, time };
    },
    async createBooking ({data, userId}: {data: CreateBookingType, userId: string}) {
        const { storeId, staffId, serviceIds, time, date } = data
        const appointment = await prisma.appointment.create({
            data: {
                store: { connect: { id: storeId } },
                client: { connect: { id: userId } },
                staff: {
                    connect: {
                        storeId_userId: {
                            storeId: storeId,
                            userId: staffId,
                        },
                    },
                },
                date,
                startTime: time,
                endTime: time + 60,
                items: {
                    create: serviceIds.map((id) => ({
                        service: { connect: { id } },
                    })),
                },
            },
        });
        return appointment.id
    }
}
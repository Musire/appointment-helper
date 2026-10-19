import { DayOfWeek } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { serviceSchemaType } from "../service/validation/service.schema";


const getUTCDayName = (date: Date) => {
    const days: DayOfWeek[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return days[date.getDay()];
};

// FIXED: Uses local hours instead of UTC hours to keep time slots accurate
function generateHourlySlots(startTime: Date, endTime: Date): string[] {
  // Use getUTCHours to read the raw database hours without timezone shifting
  const startHour = startTime.getUTCHours();
  const endHour = endTime.getUTCHours();
  
  const slots: string[] = [];

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
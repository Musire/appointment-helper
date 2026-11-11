import { createSafeAction, validateSchema } from "@/domains/auth/util/safeAction";
import { prisma } from "@/lib/prisma";
import { BookingParams } from "@/lib/utils/navigation";
import { getDatetimeService, getReviewDataService, getStoreStaffService } from "./booking.services";
import { CreateBookingSchema, CreateBookingType, DateTimeStepSchema, DateTimeStepType } from "./booking.validations";

export const getStoreStaff = createSafeAction(
    {
        allowedRoles: ['USER']
    },
    getStoreStaffService
)

export const getDatetime = createSafeAction(
    {
        allowedRoles: ['USER', 'user']
    },
    async (input: DateTimeStepType) => {
        const validated = validateSchema(DateTimeStepSchema, input)
        const res = getDatetimeService(validated)
        return res
    }
    
)

export const getBookingReview = createSafeAction(
    {
        allowedRoles: ['user', 'USER']
    },
    async (input: CreateBookingType) => {
        const validated = validateSchema(CreateBookingSchema, input)
        const res = getReviewDataService(validated)
        return res
    }
)


export async function getBookingReviewData(data: BookingParams) {
  const { store, staff, service, dateTime } = data;


  const [storeData, staffData, serviceData] = await Promise.all([
      prisma.store.findUnique({
          where: { id: store },
      }),
      prisma.user.findUnique({
          where: { id: staff },
      }),
      prisma.service.findUnique({
          where: { id: service },
      }),
  ]);

  if (!storeData || !staffData || !serviceData || !dateTime) {
    throw new Error("Invalid booking data");
  }

  const [dateString, timeString] = dateTime.split(" ")

  return {
    store: storeData,
    staff: staffData,
    services: serviceData,
    date: dateString , 
    time: timeString   
  };
}

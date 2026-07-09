import { formatAppTimeSplit, toAppTime } from "@/lib/dayjs";
import { prisma } from "../../../lib/prisma";
import { BookingParams } from "../../../lib/utils/navigation";

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


  // 1. Convert the incoming UTC ISO string directly to Chihuahua time
  const zonedTime = toAppTime(dateTime);

  // 2. Extract the beautifully formatted date and time strings
  const { dateString, timeString } = formatAppTimeSplit(zonedTime);

  return {
    store: storeData,
    staff: staffData,
    services: serviceData,
    date: dateString, 
    time: timeString  
  };
}
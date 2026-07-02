import { prisma } from "../../../lib/prisma";
import { BookingParams } from "../../../lib/utils/navigation";
import { convertUTC } from "../../../lib/utils/time";

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

  const { date, time } = convertUTC(dateTime, 'America/Guatemala')

  return {
    store: storeData,
    staff: staffData,
    services: serviceData,
    date,
    time
  };
}
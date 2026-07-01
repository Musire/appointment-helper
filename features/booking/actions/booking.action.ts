"use server";

import { convertToUTC } from "@/lib/time";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

type Input = {
  storeId: string;
  staffId: string;
  date: string;
  time: string;
  serviceId: string;
};

export async function createBookingAction({
  storeId,
  staffId,
  date,
  time,
  serviceId,
}: Input) {

    try {

        console.log(date, time)
        const startTime = convertToUTC({ date, time, tz: "America/Guatemala" })
        const start = dayjs.utc(startTime)
        const end = start.add(60, "minute")

        const s = start.toISOString()
        const e = end.toISOString()

        const appointment = { start: s, end: e, serviceId }

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

        return  {
          success: true,
          data: appointment,
          error: null
        }
    } catch (error) {
      console.error(error)
      return { success: false, error: 'internal server error'}
    }
}
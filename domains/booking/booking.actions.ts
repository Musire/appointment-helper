"use server";

import { createSafeAction, validateSchema } from "@/domains/auth/util/safeAction";
import { convertToUTC } from "@/lib/utils/time";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { createBookingService, getDatetimeService } from "./booking.services";
import { CreateBookingSchema, CreateBookingType } from "./booking.validations";
import { redirect } from "next/navigation";

dayjs.extend(utc);

type Input = {
  storeId: string;
  staffId: string;
  date: string;
  time: string;
  serviceId: string;
};

export const createBooking = createSafeAction(
  {
    allowedRoles: ["USER", 'user']
  },
  async (input: CreateBookingType) => {
    const validated = validateSchema(CreateBookingSchema, input)
    await createBookingService(validated)
    redirect('/dashboard')
  }
)

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



export const getDatetime = createSafeAction(
    {},
    getDatetimeService
)
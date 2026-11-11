
'use server';

import { toAppTime } from "./utils/dayjs";

import { createSafeAction, validateSchema } from "../auth/util/safeAction";
import { getAppointmentService, getFutureAppointmentService, getHistoryService, getPoolService } from "./appointment.services";
import { AppointmentDetails } from "./appointment.types";
import { AppointmentDetailSchema, AppointmentDetailType, HistorySchema, PoolSchema, PoolType } from "./appointment.validations";


// MOCK | ready - for sure

export const getAppointmentHistory = createSafeAction(
  {
    allowedRoles: ['STAFF', 'staff', 'USER', 'user']
  },
  async (input: PoolType) => {
    const validated = validateSchema(HistorySchema, input)
    const res = getHistoryService(validated)
    return res
  }
)

export const getAppointmentPool = createSafeAction(
  {
    allowedRoles: ['STAFF', 'staff', 'USER', 'user']
  },
  async (input: PoolType) => {
    const validated = validateSchema(PoolSchema, input)
    const res = getPoolService(validated)
    return res
  }
)

export const getAppointmentDetails = createSafeAction(
  {
    allowedRoles: ['STAFF', 'staff', 'USER', 'user']
  },
  async (input: AppointmentDetailType) => {
    const validated = validateSchema(AppointmentDetailSchema, input)
    const res  = getAppointmentService(validated)
    return res
  }
)

export const getFutureUserAppointments = createSafeAction(
  {
    allowedRoles: ["USER", "user"]
  },
  getFutureAppointmentService
)


export async function filterAppointmentToday(mockData: AppointmentDetails[]) {
  // 1. Convert your "right now" UTC anchor into your app's local timezone
  const todayAnchor = toAppTime(new Date());
  // 2. Filter using dayjs.isSame() comparing by 'day'
  return mockData.filter(item => 
    item.scheduledAt && toAppTime(item.scheduledAt).isSame(todayAnchor, "day")
  );
}






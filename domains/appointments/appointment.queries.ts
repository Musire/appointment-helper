
'use server';

import dayjs, { toAppTime } from "./utils/dayjs";

import { createSafeAction, validateSchema } from "../auth/util/safeAction";
import { getHistoryService, getPoolService } from "./appointment.services";
import { AppointmentDetails, AppointmentMetrics } from "./appointment.types";
import { HistorySchema, PoolSchema, PoolType } from "./appointment.validations";


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






export async function getAppointmentDetails(
  id: string
): AppointmentDetails | undefined {
  return appointmentMocks.find((appointment) => appointment.id === id);
}

export async function filterAppointmentToday(mockData: AppointmentDetails[]) {
  // 1. Convert your "right now" UTC anchor into your app's local timezone
  const todayAnchor = toAppTime(new Date());
  // 2. Filter using dayjs.isSame() comparing by 'day'
  return mockData.filter(item => 
    item.scheduledAt && toAppTime(item.scheduledAt).isSame(todayAnchor, "day")
  );
}

export async function getAppointmentMetrics(appointments: AppointmentDetails[]): AppointmentMetrics {
  return appointments.reduce<AppointmentMetrics>(
    (acc, current) => {
      if (current.status === "pending") acc.pending++;
      // ✨ Combines checkedin + inprogress states into the single checkedIn metric
      if (current.status === "checkedin" || current.status === "inprogress") {
        acc.checkedIn++;
      }
      if (current.status === "completed") acc.completed++;
      return acc;
    },
    { pending: 0, checkedIn: 0, completed: 0 }
  );
}




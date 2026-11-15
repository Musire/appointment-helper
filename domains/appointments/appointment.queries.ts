
'use server';


import { createSafeAction, validateSchema } from "../auth/util/safeAction";
import { getAppointmentService, getFutureAppointmentService, getHistoryService, getPoolService } from "./appointment.services";
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









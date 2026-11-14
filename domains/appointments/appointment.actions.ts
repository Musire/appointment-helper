// src/domain/appointments/actions/appointment-actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { createSafeAction, validateSchema } from '../auth/util/safeAction'
import { checkinAppointmentService, completeAppointmentService, markNoshowService, startAppointmentService } from './appointment.services'
import { appointmentCompletionSchema, appointmentCompletionType, appointmentUpdateSchema, appointmentUpdateType } from './appointment.validations'


export const checkinAppointment = createSafeAction(
  {
    allowedRoles: ['STAFF', 'staff']
  },
  async (input: appointmentUpdateType) => {
    const validated = validateSchema(appointmentUpdateSchema, input)
    const res = checkinAppointmentService(validated)
    revalidatePath(`/appointment/${validated.appointmentId}`)
    return res
  }
)

export const startService = createSafeAction(
  {
    allowedRoles: ['STAFF', 'staff']
  },
  async (input: appointmentUpdateType) => {
    const validated = validateSchema(appointmentUpdateSchema, input)
    const res = startAppointmentService(validated)
    revalidatePath(`/appointment/${validated.appointmentId}`)
    return res
  }
)

export const completeAppointment = createSafeAction(
  {
    allowedRoles: ['STAFF', 'staff']
  },
  async (input: appointmentCompletionType) => {
    const validated = validateSchema(appointmentCompletionSchema, input)
    const res = completeAppointmentService(validated)
    revalidatePath(`/appointment/${validated.appointmentId}`)
    return res
  }
)

export const markNoshow = createSafeAction(
  {
    allowedRoles: ['STAFF', 'staff']
  },
  async (input: appointmentUpdateType) => {
    const validated = validateSchema(appointmentUpdateSchema, input)
    const res = markNoshowService(validated)
    revalidatePath(`/appointment/${validated.appointmentId}`)
    return res
  }
)

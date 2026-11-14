import z from "zod";

export const PoolSchema = z.object({
    from: z.string().min(1, 'starting date missing'),
    to: z.string().min(1, 'ending date missing'),
    userId: z.string().optional(),
    staffId: z.string().optional(),
})

export const HistorySchema = z.object({
    from: z.string().min(1, 'starting date missing'),
    to: z.string().min(1, 'ending date missing'),
    userId: z.string().optional(),
    staffId: z.string().optional(),
})

export const AppointmentDetailSchema = z.object({
    id: z.uuid().min(1, 'id is needed')
})

export const FutureUserAppointmentSchema = z.object({
    userId: z.uuid().min(1, 'user id needed')
})

export const appointmentUpdateSchema = z.object({
    appointmentId: z.uuid('id needed')
})

export const appointmentCompletionSchema = z.object({
  appointmentId: z.uuid('id needed'),
  breaks: z.array(
    z.object({
      startsAt: z.number(),
      endsAt: z.number(),
    })
  ).optional(),
  notes: z.array(z.string()).optional()
});


export type PoolType = z.infer<typeof PoolSchema>
export type HistoryType = z.infer<typeof HistorySchema>
export type AppointmentDetailType = z.infer<typeof AppointmentDetailSchema>
export type FutureUserAppointmentType = z.infer<typeof FutureUserAppointmentSchema>
export type appointmentUpdateType = z.infer<typeof appointmentUpdateSchema>
export type appointmentCompletionType = z.infer<typeof appointmentCompletionSchema>


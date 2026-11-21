import z from "zod";

export const generateSignedPayloadSchema = z.object({
    appointmentId: z.string('appointment id is needed')
})

export const checkinSchema = z.object({
    appointmentId: z.uuid('appointment id is needed'),
    signature: z.string('signature required')
})

export type checkinType = z.infer<typeof checkinSchema>
export type generateSignedPayloadType = z.infer<typeof generateSignedPayloadSchema>

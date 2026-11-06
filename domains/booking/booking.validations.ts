import z from "zod";

export const ReviewSchema = z.object({
    store: z.uuid(),
    staff: z.uuid(),
    dateTime: z.iso.datetime(),
    services: z.uuid(),
})

export const StoreStaffSchema = z.object({
    storeId: z.uuid()
})


export const DateTimeStepSchema = z.object({
    storeId: z.uuid().min(1, 'store id needed'),
    staffId: z.uuid().min(1, 'staff id needed'),
    targetDate: z.date().min(1, 'target date needed')
})

export type DateTimeStepType = z.infer<typeof DateTimeStepSchema>
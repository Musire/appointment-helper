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

export const CreateBookingSchema = z.object({
  storeId: z.uuid('Store ID is required'),
  staffId: z.uuid('Staff ID is required'),
  date: z.iso
    .datetime('Date must be a valid ISO string'),
  time: z.number('Time is required'),
  serviceIds: z
    .array(z.uuid('Invalid service ID'))
    .min(1, 'At least one service must be selected'),
});


export type DateTimeStepType = z.infer<typeof DateTimeStepSchema>
export type CreateBookingType = z.input<typeof CreateBookingSchema>
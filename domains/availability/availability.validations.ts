import z from "zod";

export const MAX_SECONDS_24HRS = 86400

export const daySchema = z.enum([
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'Do',
  'Lu',
  'Ma',
  'Mi',
  'Ju',
  'Vi',
  'Sa'
]);

export const TimeBlockSchema = z.object({
    id: z.string(),
    start: z.number().int().min(1).max(MAX_SECONDS_24HRS),
    end: z.number().int().min(1).max(MAX_SECONDS_24HRS),
    days: z.array(daySchema),
});

export const SaveStoreAvailabilitySchema = z.object({
    storeStaffId: z.uuid().min(1, 'store staff id missing'),
    blocks: z.array(TimeBlockSchema)
})

export const StoreAvailabilitySchema = z.object({
    storeId: z.string().min(1, 'store id needed')
})

export const StoreStaffSchema = z.object({
    storeId: z.string().min(1, 'store id needed'),
    userId: z.string().min(1, 'staff id needed')
})


export type StoreAvailabilityType = z.infer<typeof StoreAvailabilitySchema>
export type StoreStaffType = z.infer<typeof StoreStaffSchema>
export type saveStoreAvailabilityType = z.infer<typeof SaveStoreAvailabilitySchema>
import { z } from "zod";

export const daySchema = z.enum([
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
]);

export const timeBlockSchema = z.object({
  id: z.string(),
  start: z.number().int().min(0).max(1439),
  end: z.number().int().min(1).max(1440),
  days: z.array(daySchema),
});

export const storeHoursSchema = z.array(
  z.object({
    id: z.string().min(1, "ID is required"),
    label: z.string().min(1, "Label is required"),
    isActive: z.boolean(),
    // Validates 12-hour format with AM/PM (e.g., "09:00 AM", "11:30 PM")
    start: z.string().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "Invalid start time format"),
    end: z.string().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "Invalid end time format"),
  })
);

export const StoreCreationSchema = z.object({
    id: z.string().optional().nullable(),
    name : z.string().min(1, 'store name needs to be created'),
    address: z.string().min(1, "please provide address"),
})

export const StoreDetailsSchema = z.object({
    storeId: z.string().min(1, 'storeId needed')
})

export const saveBusinessHoursSchema = z.object({
  blocks: z.array(timeBlockSchema)
})

export const invitableStaffSchema = z.object({
  storeSlug: z.string().min(1, 'store slug is needed')
})

export const storeHoursUpdateSchema = z.object({
  storeId: z.uuid().min(1, ''),
  hoursList: storeHoursSchema
})


export type StoreCreationType = z.infer<typeof StoreCreationSchema>;
export type StoreHoursInput = z.infer<typeof storeHoursSchema>;
export type StoreDetailsType = z.infer<typeof StoreDetailsSchema>;
export type saveBusinessHoursType = z.infer<typeof saveBusinessHoursSchema>;
export type invitableStaffType = z.infer<typeof invitableStaffSchema>;
export type storeHoursUpdateType = z.infer<typeof storeHoursUpdateSchema>;

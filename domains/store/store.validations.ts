import { z } from "zod";

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

export type StoreCreationType = z.infer<typeof StoreCreationSchema>;
export type StoreHoursInput = z.infer<typeof storeHoursSchema>;
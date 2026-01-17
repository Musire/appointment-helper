import z from "zod";

const TimeSlotSchema = z
  .object({
    from: z.string().optional(),
    to: z.string().optional(),
  })
  .superRefine((slot, ctx) => {
    if (!slot.from && !slot.to) return

    if (!slot.from) {
      ctx.addIssue({
        path: ["from"],
        message: "Required",
        code: "custom",
      })
    }

    if (!slot.to) {
      ctx.addIssue({
        path: ["to"],
        message: "Required",
        code: "custom",
      })
    }
  })

const DaySchema = z
  .object({
    enabled: z.boolean(),
    slots: z.array(TimeSlotSchema),
  })
  .refine(
    (day) => !day.enabled || day.slots.length > 0,
    {
      message: "At least one time slot is required",
      path: ["slots"],
    }
  )

export const AvailabilitySchema = z.object({
    monday: DaySchema,
    tuesday: DaySchema,
})

export type AvailabilityType = z.infer<typeof AvailabilitySchema>;
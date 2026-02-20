import z from "zod";

export const ReviewSchema = z.object({
    store: z.uuid(),
    staff: z.uuid(),
    dateTime: z.iso.datetime(),
    services: z.uuid(),
})


import z from "zod";

export const StoreCreationSchema = z.object({
    id: z.string().optional().nullable(),
    name : z.string().min(1, 'store name needs to be created'),
    description: z.string().min(1, "please provide a brief description").nullable(),
    timezone: z
        .string()
        .min(1)
        .refine(
            tz => Intl
                .supportedValuesOf('timeZone')
                .includes(tz),
            { message: 'Invalid timezone' }
        )
})

export type StoreCreationType = z.infer<typeof StoreCreationSchema>;
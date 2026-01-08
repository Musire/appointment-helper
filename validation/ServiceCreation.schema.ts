import z from "zod";

export const ServiceCreationSchema = z.object({
    name: z.string().min(1, 'Category name is necessary'),
    storeId: z.string(),
    categoryId: z.string().min(1, 'Please select a category'),
    durationMin: z.coerce.number().int('Please specify service duration'),
    priceCents: z.coerce.number().int('Please specify the price'),
    type: z.enum(['SINGLE', 'COMBO'])
})

export type ServiceCreationType = z.infer<typeof ServiceCreationSchema>;
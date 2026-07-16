import z from "zod";

export const ServiceCreationSchema = z.object({
    name: z.string().min(1, 'Category name is necessary'),
    storeId: z.string(),
    price: z.coerce.number().int('Please specify the price')
})

export type ServiceCreationType = z.infer<typeof ServiceCreationSchema>;
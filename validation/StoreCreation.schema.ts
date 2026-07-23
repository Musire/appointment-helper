import z from "zod";

export const StoreCreationSchema = z.object({
    id: z.string().optional().nullable(),
    name : z.string().min(1, 'store name needs to be created'),
    address: z.string().min(1, "please provide address"),
})

export type StoreCreationType = z.infer<typeof StoreCreationSchema>;
import z from "zod";

export const StoreCreationSchema = z.object({
    storeName : z.string().min(1, 'store name needs to be created')
})

export type StoreCreationType = z.infer<typeof StoreCreationSchema>;
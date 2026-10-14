import z from "zod";

export const StoreCreationSchema = z.object({
    name : z.string().min(1, 'store name needs to be created'),
    address: z.string().min(1, "please provide address"),
})

export const StoreUpdateSchema = z.object({
    id: z.uuid(),
    name : z.string().min(1, 'store name needs to be created'),
    address: z.string().min(1, "please provide address"),
})

export const StoreDeleteSchema = z.object({
    id: z.uuid()
})

export type StoreCreationType = z.infer<typeof StoreCreationSchema>;
export type StoreUpdateType = z.infer<typeof StoreUpdateSchema>;
export type StoreDeleteType = z.infer<typeof StoreDeleteSchema>;
import z from "zod";

export const CategoryCreationSchema = z.object({
    name: z.string().min(1, 'Category name is necessary'),
    storeId: z.string()
})

export type CategoryCreationType = z.infer<typeof CategoryCreationSchema>;
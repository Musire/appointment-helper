import z from "zod";


export const InviteCreationSchema = z.object({
    targetId: z.string().min(1, 'user id required'),
    storeId: z.string().min(1, 'store id required')
})


export type InviteCreationType = z.infer< typeof InviteCreationSchema>
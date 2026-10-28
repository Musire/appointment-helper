import z from "zod";


export const InviteCreationSchema = z.object({
    targetId: z.string().min(1, 'user id required'),
    storeId: z.string().min(1, 'store id required')
})

export const InviteMutateSchema = z.object({
    id: z.string().min(1, 'invite id needed')
})


export type InviteCreationType = z.infer< typeof InviteCreationSchema>
export type InviteMutateType = z.infer< typeof InviteMutateSchema>
import z from "zod";

export const PoolSchema = z.object({
    from: z.string().min(1, 'starting date missing'),
    to: z.string().min(1, 'ending date missing'),
    userId: z.string().optional(),
    staffId: z.string().optional(),
})

export const HistorySchema = z.object({
    from: z.string().min(1, 'starting date missing'),
    to: z.string().min(1, 'ending date missing'),
    userId: z.string().optional(),
    staffId: z.string().optional(),
})


export type PoolType = z.infer<typeof PoolSchema>
export type HistoryType = z.infer<typeof HistorySchema>
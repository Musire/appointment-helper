import z from "zod";

export const StoreStaffSchema = z.object({
    storeId: z.uuid()
})


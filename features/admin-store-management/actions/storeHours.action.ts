'use server';

import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { storeHoursSchema } from "@/domains/store/schemas/store.schema";
import { updateStoreHoursService } from "../services/updateStoreHoursService";
import { revalidatePath } from "next/cache";

export const updateStoreHours = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    async (storeId: string, formData: unknown) => {
        const parsed = storeHoursSchema.safeParse(formData)

        if (!parsed.success) {
            throw new Error(`Invalid data: ${parsed.error.message}`)
        }

        const validatedHours = parsed.data
        
        const result = await updateStoreHoursService(storeId, validatedHours)

        revalidatePath(`/stores/${storeId}`)

        return result
    }
    
)
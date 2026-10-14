'use server';

import { createSafeAction } from "@/domains/auth/util/safeAction";
import { storeHoursSchema } from "@/domains/store/store.validations";
import { revalidatePath } from "next/cache";
import { updateStoreHoursService } from "../services/updateStoreHoursService";

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
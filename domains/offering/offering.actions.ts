'use server'

import { createSafeAction } from "@/domains/auth/util/safeAction";
import { serviceSchema } from "@/domains/service/validation/service.schema";
import { revalidatePath } from "next/cache";
import { deleteOfferingService, editOfferingService } from "./offering.services";


export const editService = createSafeAction(
    {
        allowedRoles: ['admin', 'ADMIN']
    },
    async (serviceId: string, rawData: unknown) => {
        const validated = serviceSchema.safeParse(rawData);

        if (!validated.success) {
            const errorMessages = validated.error.issues.map(e => e.message).join(', ');
            throw new Error(`Validation error: ${errorMessages}`);
        }

        return await editOfferingService(serviceId, validated.data);
    }
)

export const deleteService = createSafeAction(
    {
        allowedRoles: ['admin', 'ADMIN']
    },
    async (serviceId: string, storeId: string) => {
        if (!serviceId) throw new Error('no valid service id')
        
        await deleteOfferingService(serviceId)

        revalidatePath(`/stores/${storeId}/services`);
    }
)
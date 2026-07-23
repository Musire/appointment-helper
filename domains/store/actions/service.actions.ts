'use server'

import { createSafeAction, safeAction } from "@/domains/identity/auth/safeAction"
import { prisma } from "@/lib/prisma"
import { assertInputAsync } from "@/lib/utils/parseSchema"
import { ServiceCreationSchema } from "@/validation/ServiceCreation.schema"
import { revalidatePath } from "next/cache"
import { serviceSchema } from "@/domains/service/validation/service.schema"
import { upsertOfferingService } from "@/domains/service/services/upsertOfferingService"

export async function createService (formData: unknown) {
    return safeAction(async() => {
        const data = await assertInputAsync(ServiceCreationSchema, formData)
        await prisma.service.create({ data })

        revalidatePath('/admin/store/title/services')
    })
}

export const upsertService = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    async (formData: unknown) => {
        const parsed = serviceSchema.safeParse(formData)

        if (!parsed.success) {
            throw new Error(`Invalid data: ${parsed.error.message}`)
        }

        const validateService = parsed.data
        
        const result = await upsertOfferingService(validateService)

        revalidatePath(`/stores/${validateService.storeId}/services`)

        return result
    }
)
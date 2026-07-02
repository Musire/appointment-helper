'use server'

import { safeAction } from "@/domains/identity/auth/safeAction"
import { prisma } from "@/lib/prisma"
import { assertInputAsync } from "@/lib/utils/parseSchema"
import { ServiceCreationSchema } from "@/validation/ServiceCreation.schema"
import { revalidatePath } from "next/cache"

export async function createService (formData: unknown) {
    return safeAction(async() => {
        const data = await assertInputAsync(ServiceCreationSchema, formData)
        await prisma.service.create({ data })

        revalidatePath('/admin/store/title/services')
    })
}
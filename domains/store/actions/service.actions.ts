'use server'

import { parseSchema } from "@/lib/helpers/parseSchema"
import { prisma } from "@/lib/prisma"
import { safeAction } from "@/lib/safeAction"
import { ServiceCreationSchema } from "@/validation/ServiceCreation.schema"
import { revalidatePath } from "next/cache"

export async function createService (formData: unknown) {
    return safeAction(async() => {
        const data = await parseSchema(ServiceCreationSchema, formData)
        await prisma.service.create({ data })

        revalidatePath('/admin/store/title/services')
    },['ADMIN'])
}
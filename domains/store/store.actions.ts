'use server';

import { requireRole } from "@/domains/auth/util/requireRole";
import { createSafeAction, safeAction, validateFormData, validateSchema } from "@/domains/auth/util/safeAction";
import { prisma } from "@/lib/prisma";
import { StoreUpdateSchema } from "@/validation/StoreCreation.schema";
import { revalidatePath } from "next/cache";
import { createStoreService, saveBusinessHoursService, updateStoreHoursService, updateStoreService } from "./store.services";
import { saveBusinessHoursSchema, StoreCreationSchema, storeHoursUpdateSchema, storeHoursUpdateType } from "./store.validations";


export const createStore = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    async (_:any, formData: FormData) => {
        const validated = validateFormData(StoreCreationSchema, formData)

        const defaultHours = [
            { label: "Lun - Vier", isActive: false, start: "09:00 AM", end: "05:00 PM" },
            { label: "Sábado", isActive: false, start: "09:00 AM", end: "02:00 PM" },
            { label: "Domingo", isActive: false, start: "09:00 AM", end: "02:00 PM" }
        ]
        
        const res = await createStoreService({data: validated, defaultHours})
        revalidatePath('/dashboard')
        return res
    }
)

export const updateStore = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    async (_:any, formData: FormData) => {
        const validated = validateFormData(StoreUpdateSchema, formData)
        const res = await updateStoreService(validated)
        revalidatePath('/dashboard')
        return res
    }
)

export async function deleteStores (target: string[]) {
    return safeAction(async () => {
        const { access, user } = await requireRole(['ADMIN'])  
        
        if (!access) {
            throw new Error('Unauthorized to perform action')
        }
        
        if (!user) {
            throw new Error('User not logged in')
        }

        const result = await prisma.store.updateMany({
            where : {
                createdById: user.id,
                id: {
                    in: target
                }
            }, 
            data: { 
                status: 'SUSPENDED'
            }
        })

        if (result.count === 0) {
            throw new Error("Not authorized or not found")
        }

        revalidatePath('/admin/dashboard')
    })
}

export const saveBusinessHours = createSafeAction(
    {
        allowedRoles: ['ADMIN', 'admin']
    },
    async (_:any, formData: FormData) => {
        const validated = validateFormData(saveBusinessHoursSchema, formData)
        const res = saveBusinessHoursService(validated)
        return res
    }
) 



export const updateStoreHours = createSafeAction(
    {
        allowedRoles: ['admin', 'ADMIN']
    }, 
    async (payload: storeHoursUpdateType) => {
        const validated = validateSchema(storeHoursUpdateSchema, payload)
        const res = updateStoreHoursService(validated)
        return res
    }
)
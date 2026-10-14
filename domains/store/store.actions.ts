'use server';

import { getCurrentUser } from "@/domains/auth/auth.actions";
import { requireRole } from "@/domains/auth/util/requireRole";
import { createSafeAction, safeAction, validateFormData } from "@/domains/auth/util/safeAction";
import { prisma } from "@/lib/prisma";
import { StoreCreationType } from "@/validation/StoreCreation.schema";
import { revalidatePath } from "next/cache";
import { createStoreService, upsertStoreService } from "./store.services";
import { StoreCreationSchema } from "./store.validations";


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


export async function updateStore (formData: StoreCreationType) {
    return safeAction(async() => {
        const { id, name, address } = formData;

        if (!id) {
            throw new Error('No store id found')
        }

        const { access, user } = await requireRole(['ADMIN'])  
        
        if (!access) {
            throw new Error('Unauthorized to perform action')
        }
        
        if (!user) {
            throw new Error('User not logged in')
        }

        const result = await prisma.store.updateMany({
            where: {
                id,
                createdById: user.id,
            },
            data: {
                name,
                address
            }
        })

        if (result.count === 0) {
            throw new Error("Not authorized or not found")
        }
    })
}

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

export const upsertStore = createSafeAction(
  {},
  async (payload) => {
    const user = await getCurrentUser()
    if (!user || !user.id) return;

    await upsertStoreService({...payload, id: user.id})
  }
)
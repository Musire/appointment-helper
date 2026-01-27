'use server';

import { requireRole } from "@/lib/auth/requireRole";
import { safeAction } from "@/lib/safeAction";
import { prisma } from "@/lib/prisma";
import { StoreCreationSchema, StoreCreationType } from "@/validation/StoreCreation.schema";
import { revalidatePath } from "next/cache";


export async function createStore (formData: StoreCreationType)  {

    return safeAction(async ()  => {
        const { access, user } = await requireRole(['ADMIN'])  
        
        if (!access) {
            throw new Error('Unauthorized to perform action')
        }
        
        if (!user) {
            throw new Error('User not logged in')
        }

        const parsed = StoreCreationSchema.safeParse(formData)

        if (!parsed.success) {
            throw new Error(parsed.error.issues[0].message);
        }

        const { name, description, timezone } = parsed.data

        await prisma.store.create({
            data: {
                name,
                description,
                timezone,
                createdById: user.id
            }
        })
        
        revalidatePath('/admin/dashboard')

    })
    
}

export async function updateStore (formData: StoreCreationType) {
    return safeAction(async() => {
        const { id, name, description } = formData;

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
                description
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
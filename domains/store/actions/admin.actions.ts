'use server';

import { requireRole } from "@/domains/auth/util/requireRole";
import { safeAction } from "@/domains/auth/util/safeAction";
import { prisma } from "@/lib/prisma";
import { StoreCreationSchema, StoreCreationType, StoreUpdateType } from "@/validation/StoreCreation.schema";
import { revalidatePath } from "next/cache";


export async function createStore (formData: StoreCreationType) {
  return safeAction(async () => {
    // 1. Authenticate and authorize
    const { access, user } = await requireRole(['ADMIN'])
    if (!access) {
      throw new Error('Unauthorized to perform action')
    }
    if (!user) {
      throw new Error('User not logged in')
    }

    // 2. Validate input data
    const parsed = StoreCreationSchema.safeParse(formData)
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message);
    }
    const { name, address } = parsed.data

    

    // 4. Create Store, Config, and Hours in one nested transaction
    await prisma.store.create({
      data: {
        name,
        address,
        createdById: user.id,
      }
    })

    revalidatePath('/dashboard')
  })
}

export async function updateStore (formData: StoreUpdateType) {
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



'use server';

import { requireRole } from "@/domains/identity/auth/requireRole";
import { createSafeAction, safeAction } from "@/domains/identity/auth/safeAction";
import { getCurrentUser } from "@/domains/identity/auth/session";
import { prisma } from "@/lib/prisma";
import { StoreCreationSchema, StoreCreationType } from "@/validation/StoreCreation.schema";
import { revalidatePath } from "next/cache";
import { upsertStoreService } from "../services/upsertStore.service";


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

    // 3. Define default store hours data
    const defaultHours = [
      { label: "Lun - Vier", isActive: false, start: "09:00 AM", end: "05:00 PM" },
      { label: "Sábado", isActive: false, start: "09:00 AM", end: "02:00 PM" },
      { label: "Domingo", isActive: false, start: "09:00 AM", end: "02:00 PM" }
    ]

    // 4. Create Store, Config, and Hours in one nested transaction
    await prisma.store.create({
      data: {
        name,
        address,
        createdById: user.id,
        // Nesting the StoreConfig creation
        config: {
          create: {
            // Nesting multiple StoreHour creations inside the Config
            hours: {
              createMany: {
                data: defaultHours
              }
            }
          }
        }
      }
    })

    // 5. Revalidate cache
    revalidatePath('/dashboard')
  })
}


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
'use server';

import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/safeAction";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./auth.actions";

export async function editStoreConfig (storeId: string) {

    return safeAction(async() => {

        const payload = {
            storeId,
            "hours": {
                "mon": { "start": "09:00", "end": "17:00" },
                "tue": { "start": "09:00", "end": "17:00" },
                "wed": { "start": "09:00", "end": "17:00" },
                "thu": { "start": "09:00", "end": "17:00" },
                "fri": { "start": "09:00", "end": "17:00" },
                "sat": { "start": "09:00", "end": "17:00" },
                "sun": { "start": "09:00", "end": "17:00" },
            },
            "buffers": { "before": 0, "after": 0 },
            "policies": { "cancel": "24h notice" }
        }

        await prisma.storeConfig.upsert({
            where: { storeId },
            update: {
                hours: payload.hours,
                buffers: payload.buffers,
                policies: payload.policies
            },
            create: {
                storeId,
                hours: payload.hours,
                buffers: payload.buffers,
                policies: payload.policies
            }
        })

    }, ['ADMIN'])
}

export async function createServiceCategory ({ storeId, name }: { storeId: string, name: string}) {
    return safeAction(async() => {
        await prisma.serviceCategory.upsert({
            where: { 
                storeId_name: {
                    storeId,
                    name
                }
             },
            update: {
                name
            },
            create: {
                storeId,
                name
            }
        })
    }, ['ADMIN'])
}

export async function sendInvite({ targetId, storeId, storeName }: { targetId: string; storeId: string; storeName: string;}) {
  return safeAction(async () => {
    const user = await getCurrentUser()
    if (!user) throw new Error("User not logged in")

    return prisma.$transaction(async (tx) => {
      const existingInvite = await tx.invite.findFirst({
        where: {
          userId: targetId,
          storeId,
        },
      })

      if (existingInvite) {
        throw new Error("User already invited to this store")
      }

      const invite = await tx.invite.create({
        data: {
          userId: targetId,
          storeId,
          invitedBy: user.id,
          role: "STAFF",
        },
      })

      await tx.notification.create({
        data: {
          userId: targetId,
          type: "STORE_INVITATION",
          payload: {
            inviteId: invite.id,
            inviteStatus: 'PENDING'
          },
        },
      })

      revalidatePath(`/admin/store/${storeName}/staff/invite`)
      return invite
    })
  })
}


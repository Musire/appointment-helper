'use server';

import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/safeAction";
import { getCurrentUser } from "./auth.actions";

export async function acceptInvite (inviteId: string, notificationId: string) {
    return safeAction( async () => {
        const user = await getCurrentUser()
        if (!user) throw new Error('No user logged in ')

        return prisma.$transaction(async (tx) => {

            // 1. Validate the invite exists
            const invite = await tx.invite.findFirst({
                where: { 
                    id: inviteId,
                    userId: user.id 
                },
            })

            if (!invite) {
                throw new Error("Invite not found")
            }

            if (invite.status !== "PENDING") {
                throw new Error("Invite already handled")
            }

            // 2. Accept invite
            await tx.invite.update({
                where: { id: inviteId },
                    data: {
                        status: "ACCEPTED",
                },
            })

            await tx.notification.update({
                where: {
                    id: notificationId
                },
                data : {
                    read: true
                }
            })

            // 3. Create StoreStaff record
            await tx.storeStaff.create({
                data: {
                    storeId: invite.storeId,
                    userId: user.id,
                    role: invite.role,
                    status: "ACTIVE",
                }
            })
        })
    })
}

export async function rejectInvite (inviteId: string, notificationId: string) {
    return safeAction( async () => {
        const user = await getCurrentUser()
        if (!user) throw new Error('No user logged in ')

        return prisma.$transaction(async (tx) => {
            
            // 1. Validate the invite exists
            const invite = await tx.invite.findFirst({
                where: { 
                    id: inviteId,
                    userId: user.id 
                },
            })

            if (!invite) {
                throw new Error("Invite not found")
            }

            if (invite.status !== "PENDING") {
                throw new Error("Invite already handled")
            }

            // 2. Reject invite
            await tx.invite.update({
                where: { id: inviteId },
                    data: {
                        status: "REJECTED",
                },
            })

            await tx.notification.update({
                where: {
                    id: notificationId
                },
                data : {
                    read: true
                }
            })

        })
    })
}
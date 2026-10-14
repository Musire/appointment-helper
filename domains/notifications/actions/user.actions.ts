'use server';

import { getCurrentUser } from "@/domains/auth/auth.actions";
import { safeAction } from "@/domains/auth/util/safeAction";
import { prisma } from "@/lib/prisma";


export async function getNotifications() {

    return safeAction(async () => {
        const user = await getCurrentUser()
        if (!user) throw new Error("Not authenticated");
        
        const notifications = await prisma.notification.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 50,
        })

        return notifications
    })
}
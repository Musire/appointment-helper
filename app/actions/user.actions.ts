'use server';

import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/safeAction";
import { getCurrentUser } from "./auth.actions";


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
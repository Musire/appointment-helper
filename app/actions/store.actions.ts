'use server';

import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/safeAction";

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
import { createSafeAction } from "@/domains/identity/auth/safeAction"
import { prisma } from "@/lib/prisma"
import { getStoresService } from "../services/getStoresService"


export const getStores = createSafeAction(
    {
        allowedRoles: ['USER']
    },
    getStoresService
)



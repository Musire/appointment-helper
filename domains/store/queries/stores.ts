import { createSafeAction } from "@/domains/auth/util/safeAction"
import { getStoresService } from "../services/getStoresService"


export const getStores = createSafeAction(
    {
        allowedRoles: ['USER']
    },
    getStoresService
)



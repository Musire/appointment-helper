import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { StoreService } from "../services/getStoreStatusService";


export const getStoreStatus = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    async(storeId: string) => {
        const [storeInfo, metrics] = await Promise.all([
            StoreService.syncStoreStatus(storeId),
            StoreService.getDashboardMetrics(storeId),
        ]);

        return { storeInfo, metrics }
    }
)
import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getStoreHoursService } from "../services/getStoreHoursService";

export const getStoreHours = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    getStoreHoursService
)
import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getAvailableStaffService } from "../services/getAvailableStaffService";


export const getAvailableStaff = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    getAvailableStaffService
)
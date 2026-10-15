import { createSafeAction } from "@/domains/auth/util/safeAction";
import { getAvailableStaffService } from "./staff.services";

export const getAvailableStaff = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    getAvailableStaffService
)
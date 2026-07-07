import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getStoreStaffService } from "../services/staff.services";

export const getStoreStaff = createSafeAction(
    {
        allowedRoles: ['USER']
    },
    getStoreStaffService
)
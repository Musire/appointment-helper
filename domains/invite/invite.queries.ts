import { createSafeAction } from "@/domains/auth/util/safeAction";
import { getInviteService } from "@/features/admin-invite-staff/services/getInviteService";


export const getInviteStatus = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    getInviteService
)
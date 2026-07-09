import { createSafeAction } from "@/domains/identity/auth/safeAction";
import { getInviteService } from "../services/getInviteService";


export const getInviteStatus = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    getInviteService
)
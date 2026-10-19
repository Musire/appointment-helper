import { createSafeAction } from "@/domains/auth/util/safeAction";
import { getInviteService } from "./invite.services";


export const getInviteStatus = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    getInviteService
)
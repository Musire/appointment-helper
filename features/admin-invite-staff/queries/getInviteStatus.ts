import { createSafeAction } from "@/domains/auth/util/safeAction";
import { getInviteService } from "../services/getInviteService";


export const getInviteStatus = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    getInviteService
)
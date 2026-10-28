'use server'

import { createSafeAction } from "@/domains/auth/util/safeAction";
import { getInviteService, getStaffInviteService } from "./invite.services";


export const getInviteStatus = createSafeAction(
    {
        allowedRoles: ['admin']
    },
    getInviteService
)

export const getStaffInvites = createSafeAction(
    {
        allowedRoles: ['staff', 'STAFF']
    },
    getStaffInviteService
)


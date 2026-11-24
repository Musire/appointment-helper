'use server'

import { createSafeAction } from "../auth/util/safeAction"
import { getStaffProfileStatusService, getStoreProfileStatusService } from "./profile.services"


export const getStaffProfileStatus = createSafeAction(
    {
        allowedRoles: ['STAFF', 'staff']
    },
    getStaffProfileStatusService
)


export const getStoreProfileStatus = createSafeAction(
    {
        allowedRoles: ['ADMIN', 'admin']
    },
    async (input: { storeId: string}) => {
        const res = getStoreProfileStatusService(input)
        return res
    }
)
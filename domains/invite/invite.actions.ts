'use server';

import { revalidatePath } from "next/cache";
import { createSafeAction, validateSchema } from "../auth/util/safeAction";
import { acceptInviteService, rejectInviteService, sendInviteService } from "./invite.services";
import { InviteCreationSchema, InviteCreationType, InviteMutateSchema, InviteMutateType } from "./invite.validations";


export const sendInvite = createSafeAction(
    {
        allowedRoles: ['ADMIN', 'admin']
    },
    async (data: InviteCreationType) => {
        const validated = validateSchema(InviteCreationSchema, data)
        const res = sendInviteService(validated)
        revalidatePath(`/stores/${data.storeId}/staff`)
        return res
    }
)

export const acceptInvite = createSafeAction(
    {
        allowedRoles: ['staff', 'STAFF']
    },
    async (input: InviteMutateType) => {
        const validated = validateSchema(InviteMutateSchema, input)
        const res = acceptInviteService(validated)
        revalidatePath('/stores')
        return res
    }
)

export const rejectInvite = createSafeAction(
    {
        allowedRoles: ['staff', 'STAFF']
    },
    async (input: InviteMutateType) => {
        const validated = validateSchema(InviteMutateSchema, input)
        const res = rejectInviteService(validated)
        revalidatePath('/stores')
        return res
    }
)
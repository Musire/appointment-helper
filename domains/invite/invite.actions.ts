'use server';

import { revalidatePath } from "next/cache";
import { createSafeAction, validateSchema } from "../auth/util/safeAction";
import { sendInviteService } from "./invite.services";
import { InviteCreationSchema, InviteCreationType } from "./invite.validations";


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
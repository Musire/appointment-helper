import { getPrismaUserId } from "../auth/util/session";
import { inviteRespository } from "./invite.repository";
import { InviteCreationType, InviteMutateType } from "./invite.validations";

export async function getInviteService (storeId: string) {
    return inviteRespository.getInvites(storeId)
}


export async function sendInviteService (data: InviteCreationType) {
    const id = await getPrismaUserId()
    if (!id) throw new Error('no id found in db') 
    inviteRespository.sendInvite(data, id)
}

export async function getStaffInviteService () {
    const id = await getPrismaUserId()
    if (!id) throw new Error('no id found in db');
    return inviteRespository.getStaffInvites(id)
}

export async function acceptInviteService (data: InviteMutateType) {
    const userId = await getPrismaUserId()
    if (!userId) throw new Error('no user found')
    return inviteRespository.acceptInvite(data.id, userId)
}

export async function rejectInviteService (data: InviteMutateType) {
    const userId = await getPrismaUserId()
    if (!userId) throw new Error('no user found')
    return inviteRespository.rejectInvite(data.id, userId)
}
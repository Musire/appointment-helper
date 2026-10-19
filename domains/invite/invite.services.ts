import { getPrismaUserId } from "../auth/util/session";
import { inviteRespository } from "./invite.repository";
import { InviteCreationType } from "./invite.validations";

export async function getInviteService (storeId: string) {
    return inviteRespository.getInvites(storeId)
}


export async function sendInviteService (data: InviteCreationType) {
    const id = await getPrismaUserId()
    if (!id) throw new Error('no id found in db') 
    inviteRespository.sendInvite(data, id)
}
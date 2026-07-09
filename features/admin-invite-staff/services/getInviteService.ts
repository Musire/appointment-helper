import { inviteRespository } from "../repositories/inviteRepository";


export async function getInviteService (storeId: string) {
    return inviteRespository.getInvites(storeId)
}
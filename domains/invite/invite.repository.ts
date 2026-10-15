import { StoreRole } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { InviteCreationType } from "./invite.validations";


export const inviteRespository = {
    async getInvites (storeId: string) {
        const invites = await prisma.invite.findMany({
            where: {
                storeId
            },
            select: {
                id: true,
                status: true,
                user: {
                    select: {
                        fullName: true,
                        email: true,
                        avatarUrl: true,
                    },
                },
            },
        });
        return invites
    },
    async sendInvite(data: InviteCreationType, userId: string) {
        const invite = await prisma.invite.create({
            data: {
                role: StoreRole.STAFF,
                storeId: data.storeId,
                userId: data.targetId,
                invitedBy: userId
            }
        })
        return invite
    }
}
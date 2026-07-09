import { prisma } from "@/lib/prisma";


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
    }
}
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
    },
    async getStaffInvites(staffId: string) {
        const invites = await prisma.invite.findMany({
            where: { 
                userId: staffId,
                status: "PENDING"
            },
            include: {
                store: true
            }
        })
        return invites
    },
    async acceptInvite (id: string, userId: string) {
        return prisma.$transaction(async (tx) => {
            const result = await tx.invite.updateMany({
                where: {
                    id,
                    userId,
                    status: "PENDING",
                },
                data: {
                    status: "ACCEPTED",
                },
            });

            if (result.count === 0) {
                throw new Error("Invitation not found or no longer pending");
            }

            // 2. Retrieve the now-accepted invitation.
            const invite = await tx.invite.findUniqueOrThrow({
                where: { id },
            });

            // 3. Check for an existing membership.
            const existingMembership = await tx.storeStaff.findUnique({
                where: {
                    storeId_userId: {
                    storeId: invite.storeId,
                    userId,
                    },
                },
            });

            if (existingMembership?.status === "ACTIVE") {
                throw new Error("You are already an active member of this store");
            }

            // 4. Create or reactivate membership.
            const membership = existingMembership
            ? await tx.storeStaff.update({
                where: { id: existingMembership.id },
                data: {
                    role: invite.role,
                    status: "ACTIVE",
                },
                })
            : await tx.storeStaff.create({
                data: {
                    storeId: invite.storeId,
                    userId,
                    role: invite.role,
                    status: "ACTIVE",
                },
                });

            // 5. Return the result.
            return membership;
        });
    },
    async rejectInvite (id: string, userId: string) {
        const invite = await prisma.invite.update({
            where: {
                id,
                userId,
                status: "PENDING",
            },
            data: {
                status: 'REJECTED'
            }
        })

        return invite
    }
}
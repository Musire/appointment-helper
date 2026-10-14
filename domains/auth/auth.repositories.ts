import { prisma } from "@/lib/prisma"

export const AuthRepository = {
    async getUserPrismaId(target: string) {
        const user = await prisma.user.findFirst({
            where: {
                authId: target
            }
        })
        return user
    }
}
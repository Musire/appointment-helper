import { getCurrentUser } from "@/app/actions/auth.actions";
import { prisma } from "@/lib/prisma";


export async function getProfile () {
    try {
        const user = await getCurrentUser()
        if (!user) return;

        return prisma.user.findUnique({
            where: {
                id: user.id
            }
        })

        
    } catch (error) {
        
    }
}
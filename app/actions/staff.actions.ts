'use server';

import { parseSchema } from "@/lib/helpers/parseSchema";
import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/safeAction";
import { ProfileCreationSchema, ProfileCreationType } from "@/validation/ProfileCreation.schema";
import { getCurrentUser } from "./auth.actions";

export async function createStaffProfile (formData: ProfileCreationType) {
    return await safeAction( async () => {
        const user = await getCurrentUser()
        if (!user) {
            throw new Error('User not signed in')
        }
        const { bio } = await parseSchema(ProfileCreationSchema,formData)

        return prisma.staffProfile.create({
            data: {
                bio,
                userId: user.id
            }
        })

    })
}
'use server';

import { getCurrentUser } from "@/domains/auth/auth.actions";
import { safeAction } from "@/domains/auth/util/safeAction";
import { prisma } from "@/lib/prisma";
import { assertInputAsync } from "@/lib/utils/parseSchema";
import { ProfileCreationSchema, ProfileCreationType } from "@/validation/ProfileCreation.schema";

export async function createStaffProfile (formData: ProfileCreationType) {
    return await safeAction( async () => {
        const user = await getCurrentUser()
        if (!user) {
            throw new Error('User not signed in')
        }
        const { bio } = await assertInputAsync(ProfileCreationSchema,formData)

        return prisma.staffProfile.create({
            data: {
                bio,
                userId: user.id
            }
        })

    })
}
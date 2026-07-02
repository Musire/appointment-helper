'use server';

import { safeAction } from "@/domains/identity/auth/safeAction";
import { prisma } from "@/lib/prisma";
import { assertInputAsync } from "@/lib/utils/parseSchema";
import { ProfileCreationSchema, ProfileCreationType } from "@/validation/ProfileCreation.schema";
import { getCurrentUser } from "../../../domains/identity/actions/auth.actions";

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
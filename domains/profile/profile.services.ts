import { getPrismaUserId } from "../auth/util/session";
import { ProfileRepository } from "./profile.repositories";
import { toAccountStatus } from "./profile.util";


export async function getStaffProfileStatusService () {
    const userId = await getPrismaUserId()
    if (!userId) throw new Error('no user found in prisma')
    const status = await ProfileRepository.getStaffProfileStatus(userId)
    return toAccountStatus(status, "profileActive", {
        bioCompleted: "Complete your bio",
        hasActiveStore: "Activate your store",
        hasAvailability: "Set your availability",
    })
}

export async function getStoreProfileStatusService (data: { storeId: string }) {
    return ProfileRepository.getStoreProfileStatus(data.storeId)
}
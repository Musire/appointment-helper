import { getPrismaUserId } from "../auth/util/session";
import { AvailabilityRepository, StoreStaffRepository } from "./availability.repositories";
import { convertToAvailability } from "./availability.utils";
import { saveStoreAvailabilityType, StoreAvailabilityType } from "./availability.validations";

export async function getStoreAvailabilityService(data: StoreAvailabilityType) {
    const userId = await getPrismaUserId();
    if (!userId) throw new Error('prisma user not found');
    
    const storeStaff = await StoreStaffRepository.getStoreStaff({ storeId: data.storeId, userId });
    if (!storeStaff) throw new Error('No storestaff found');

    const records = await AvailabilityRepository.getStoreAvailability(storeStaff.id);

    if (!records || records.length === 0) {
        return {
            storeStaffId: storeStaff.id,
        };
    }

    return {
        records,
        storeStaffId: storeStaff.id,
    };
}


export async function saveStoreAvailabilityService (data: saveStoreAvailabilityType ) {
    const records = convertToAvailability(data.blocks, data.storeStaffId)
    console.log(records)
    return StoreStaffRepository.saveStoreAvailability(records, data.storeStaffId)
}
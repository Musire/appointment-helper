import { storeRepository } from "@/domains/store/store.repositories";
import { StoreHoursInput } from "@/domains/store/store.validations";


export async function updateStoreHoursService (
    storeId: string, 
    hours: StoreHoursInput
) {
    return storeRepository.updateStoreHours(storeId, hours)
}
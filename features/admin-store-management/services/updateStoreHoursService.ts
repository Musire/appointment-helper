import { storeRepository } from "@/domains/store/repositories/storeRepository";
import { StoreHoursInput } from "@/domains/store/schemas/store.schema";


export async function updateStoreHoursService (
    storeId: string, 
    hours: StoreHoursInput
) {
    return storeRepository.updateStoreHours(storeId, hours)
}
import { storeRepository } from "../repositories/storeRepository";

export async function getStoreHoursService (storeId: string) {
    return storeRepository.getStoreHours(storeId)
}
import { storeRepository } from "../repositories/storeRepository"


export async function getStoresService () {
    return storeRepository.findStoresByUserId()
}
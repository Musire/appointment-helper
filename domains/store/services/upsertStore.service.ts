import { storeRepository } from "../repositories/storeRepository";

const defaultHours = [
    { label: "Lun - Vier", isActive: false, start: "09:00 AM", end: "05:00 PM" },
    { label: "Sábado", isActive: false, start: "09:00 AM", end: "02:00 PM" },
    { label: "Domingo", isActive: false, start: "09:00 AM", end: "02:00 PM" }
]

export async function upsertStoreService (data: { storeId: string, name: string, address: string, id: string}) {
    const found  = await storeRepository.findStore(data.storeId)

    if (!found) {
        storeRepository.createStore({
            defaultHours, 
            name: data.name, 
            address: data.address, 
            id: data.id})
        return;
    }

}
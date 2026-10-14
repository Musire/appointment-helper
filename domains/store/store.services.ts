import { StoreStatus } from "@/generated/prisma";
import { getPrismaUserId } from "../auth/util/session";
import { storeRepository } from "./store.repositories";
import { type defaultHours } from "./store.types";
import { StoreCreationType } from "./store.validations";



export async function createStoreService ({data, defaultHours}: {data: StoreCreationType, defaultHours: defaultHours}) {
    const id = await getPrismaUserId()
    if (!id) throw new Error('user id not found')
    return storeRepository.createStore({ data, defaultHours, id })
}














export async function getStoreHoursService (storeId: string) {
    const hours = await storeRepository.getStoreHours(storeId);

    // 2. Define UI row order rules
    const orderMap: Record<string, number> = {
        'lun - vier': 1,
        'sabado': 2,
        'domingo': 3
    };

    // 3. Transform and return sorted data
    return [...hours].sort((a, b) => {
        const weightA = orderMap[a.label] ?? 99;
        const weightB = orderMap[b.label] ?? 99;
        return weightA - weightB;
    });
}


export async function getStoresService () {
    return storeRepository.findStoresByUserId()
}





export const StoreService = {
    async syncStoreStatus(storeId: string) {
        // Phase 1 Guard: Fetch the store first to check existence and base status
        const store = await storeRepository.findStoreWithStatus(storeId);
        if (!store) {
            throw new Error("Store profile not found.");
        }

        const setupIssues: string[] = [];

        // Early Return Guard: If suspended, skip metric calculations entirely
        if (store.status === StoreStatus.SUSPENDED) {
            setupIssues.push("This storefront is currently suspended");
            return { ...store, setupIssues };
        }

        // Phase 2: Store is valid and not suspended, now pull metrics safely in parallel
        const [servicesCount, activeHoursCount] = await Promise.all([
            storeRepository.countServices(storeId),
            storeRepository.countStoreDays(storeId)
        ]);

        // Derive logic metrics
        const hasServices = servicesCount > 0;
        const hasActiveDay = activeHoursCount > 0;

        if (!hasServices) setupIssues.push("No services created yet");
        if (!hasActiveDay) setupIssues.push("No operational hours set active");

        // Evaluate state machine transitions
        const finalStatus = (hasServices && hasActiveDay) 
            ? StoreStatus.ACTIVE 
            : StoreStatus.DRAFT;

        // Persist status update only if a real state change happens
        const displayStore = store.status !== finalStatus
            ? await storeRepository.updateStoreStatus(storeId, finalStatus)
            : store;

        return { ...displayStore, setupIssues };
    },
    async getDashboardMetrics(storeId: string) {
        const [services, staff, invites] = await Promise.all([
            storeRepository.countServices(storeId),
            storeRepository.countStaff(storeId),
            storeRepository.countInvites(storeId)
        ]);

        return { services, staff, invites };
    },
}



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
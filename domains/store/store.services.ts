

import { StoreStatus } from "@/generated/prisma";
import { unslugify } from "@/lib/utils/stringMutate";
import { StoreUpdateType } from "@/validation/StoreCreation.schema";
import { getPrismaUserId } from "../auth/util/session";
import { storeRepository } from "./store.repositories";
import { type defaultHours } from "./store.types";
import { toStoreHours } from "./store.utilities";
import { invitableStaffType, saveBusinessHoursType, StoreCreationType, StoreDetailsType, storeHoursUpdateType } from "./store.validations";


// GET SERVICE FUNCTIONS

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

export async function storeDetailsService (data: StoreDetailsType) {
    return storeRepository.getStoreDetails(data)
}

export async function getActiveStoresService () {
    return storeRepository.getActiveStores()
}


export async function saveBusinessHoursService (data: saveBusinessHoursType) {
    const hours = toStoreHours(data.blocks)
    
    storeRepository.saveBusinessHours(data)
}


// STORE-STAFF FUNCTIONS

export async function getInvitableStaffService(data: invitableStaffType) {
    const storeName = unslugify(data.storeSlug)
    
    const store = await storeRepository.getStoreByName(storeName)
    if (!store) throw new Error('No store found')
    
    return storeRepository.getInvitableStaff(store.id)
}

export async function updateStoreHoursService (data : storeHoursUpdateType) {
    return storeRepository.updateStoreHours(data)
}


export async function syncStoreStatus(storeId: string) {
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
}

export async function getDashboardMetrics(storeId: string) {
    const [services, staff, invites] = await Promise.all([
        storeRepository.countServices(storeId),
        storeRepository.countStaff(storeId),
        storeRepository.countInvites(storeId)
    ]);

    return { services, staff, invites };
}



// CREATE/UPDATE SERVICE FUNCTIONS


export async function createStoreService ({data, defaultHours}: {data: StoreCreationType, defaultHours: defaultHours}) {
    const id = await getPrismaUserId()
    if (!id) throw new Error('user id not found')
    return storeRepository.createStore({ data, defaultHours, id })
}

export async function updateStoreService (data: StoreUpdateType) {
    return storeRepository.updateStore(data)
}





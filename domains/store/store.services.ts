

import { StoreStatus } from "@/generated/prisma";
import { unslugify } from "@/lib/utils/stringMutate";
import { StoreUpdateType } from "@/validation/StoreCreation.schema";
import { getPrismaUserId } from "../auth/util/session";
import { storeRepository } from "./store.repositories";
import { invitableStaffType, saveBusinessHoursType, StoreCreationType, StoreDetailsType, storeHoursUpdateType } from "./store.validations";


// GET SERVICE FUNCTIONS

export async function getStoreHoursService (data: {storeId: string}) {
    const hours = await storeRepository.getStoreHours(data.storeId);

    return hours
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


export async function saveBusinessHoursService(data: saveBusinessHoursType) {
    const { storeId, blocks } = data;

    const storeConfig = await storeRepository.findStoreConfig(storeId);

    if (!storeConfig) {
        throw new Error("Store configuration not found.");
    }

    const hours = blocks.flatMap(block =>
        block.days.map(day => ({
            storeConfigId: storeConfig.id,
            day,
            start: block.start,
            end: block.end,
        }))
    );

    return storeRepository.saveBusinessHours({
        storeConfigId: storeConfig.id,
        hours
    });
}



export async function getStaffStoreService () {
    const id = await getPrismaUserId()
    if (!id) throw new Error('No db user')
    return storeRepository.getStaffStores(id)
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
    const store = await storeRepository.findStoreWithStatus(storeId);

    if (!store) {
        throw new Error("Store profile not found.");
    }

    type Requirement = {
        label: string;
        completed: boolean;
    };

    const requirements: Requirement[] = [];

    // Suspended guard
    if (store.status === StoreStatus.SUSPENDED) {
        return {
            id: store.id,
            name: store.name,
            address: store.address,
            active: false,
            requirements: [
                {
                    label: "Store is not suspended",
                    completed: false,
                },
            ],
        };
    }

    const [servicesCount, activeHoursCount] = await Promise.all([
        storeRepository.countServices(storeId),
        storeRepository.countStoreDays(storeId),
    ]);

    requirements.push(
        {
            label: "Services setup",
            completed: servicesCount > 0,
        },
        {
            label: "Hours of operation setup",
            completed: activeHoursCount > 0,
        }
    );

    const active = requirements.every(item => item.completed);

    if (store.status !== (active ? StoreStatus.ACTIVE : StoreStatus.DRAFT)) {
        await storeRepository.updateStoreStatus(
            storeId,
            active ? StoreStatus.ACTIVE : StoreStatus.DRAFT
        );
    }

    return {
        id: store.id,
        name: store.name,
        address: store.address,
        active,
        requirements,
    };
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


export async function createStoreService (data: StoreCreationType) {
    const id = await getPrismaUserId()
    if (!id) throw new Error('user id not found')
    return storeRepository.createStore({ data, id })
}

export async function updateStoreService (data: StoreUpdateType) {
    return storeRepository.updateStore(data)
}





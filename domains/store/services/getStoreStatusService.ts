import { StoreStatus } from "@/generated/prisma";
import { storeRepository } from "../repositories/storeRepository";


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


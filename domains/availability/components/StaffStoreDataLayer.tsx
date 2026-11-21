import StaffStores from "@/domains/availability/components/StaffStores";
import { getStaffStores } from "@/domains/store/store.queries";

export default async function StaffStoreDataLayer () {
    const { data: stores } = await getStaffStores()

    return (
        <StaffStores stores={stores ?? []} />
    );
}
import { getStaffInvites } from "@/domains/invite/invite.queries";
import { getStaffStores } from "@/domains/store/store.queries";
import StoreAvailability from "./StoreAvailability";

export default async function StaffStoreDataLayer () {
    const { data: stores } = await getStaffStores()
    const { data: invites } = await getStaffInvites() 


    return (
        <StoreAvailability stores={stores ?? []} invites={invites ?? []} />
    );
}
import { getStaffInvites } from "@/domains/invite/invite.queries";
import { getStaffStores } from "@/domains/store/store.queries";
import StaffInviteCard from "./StaffInviteCard";
import StoreStaffCard from "./StoreStaffCard";

export default async function StaffStoreDataLayer () {
    const { data: stores } = await getStaffStores()
    const { data: invites } = await getStaffInvites() 


    return (
        <section className="flex flex-1 p-6 stacked">
            <p className="">store availability</p>
                {stores?.map(s => <StoreStaffCard key={s.store.id} storeStaff={s.store} />)}
            <p className="">invites</p>
            <div className="w-full rounded-lg border-border border min-h-96">
                {invites?.map(i=> <StaffInviteCard key={i.id} inviteId={i.id} store={i.store} />)}
            </div>
        </section>
    );
}
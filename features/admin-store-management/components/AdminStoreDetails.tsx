import { getStoreHours, getStoreStatus } from "@/domains/store/store.queries";
import DashboardHeader from "./DashboardHeader";
import StatusCard from "./StatusCard";
import StoreHours from "./StoreHours";

type Props = {
  storeId: string;
}

export default async function AdminStoreDetails ({ storeId }: Props) {
    const { data: storeHours } = await getStoreHours(storeId)
    const { data: res } = await getStoreStatus(storeId)
    if (!storeHours || !res) return null;

    const storeBase = `/stores/${storeId}`;
    
    return (
        <section className="stacked space-y-4 flex-1 p-6 overflow-hidden ">
            <DashboardHeader StoreInfo={res.storeInfo} storeId={storeId} />
            <ul className="spaced space-x-4 overflow-x-scroll scrollbar-none pr-4 h-24 ">
                <StatusCard
                    value={res.metrics.services }
                    label="Services"
                    href={`${storeBase}/services`}
                />
                <StatusCard 
                    value={res.metrics.staff }
                    label="Staff"
                    href={`${storeBase}/staff`}
                />
                <StatusCard 
                    value={res.metrics.invites }
                    label="Invites"
                    href={`${storeBase}/staff`}
                />
            </ul>
            <StoreHours initialHours={storeHours} />
        </section>
    );
}
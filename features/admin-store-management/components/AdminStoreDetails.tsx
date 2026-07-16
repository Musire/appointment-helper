import { getStoreHours } from "@/domains/store/queries/getStoreHours";
import DashboardHeader from "./DashboardHeader";
import StatusCard from "./StatusCard";
import StoreHours from "./StoreHours";

type Props = {
  storeId: string
}

export default async function AdminStoreDetails ({ storeId }: Props) {
    const { data: storeHours } = await getStoreHours(storeId)
    if (!storeHours) return null;

    const storeBase = `/stores/${storeId}`;
    
    return (
        <main className="py-6 flex-1 stacked">
            <DashboardHeader />
            <ul className="spaced">
                <StatusCard
                    value={1}
                    label="Services"
                    href={`${storeBase}/services`}
                />
                <StatusCard 
                    value={2}
                    label="Staff"
                    href={`${storeBase}/staff`}
                />
                <StatusCard 
                    value={3}
                    label="Invites"
                    href={`${storeBase}/staff`}
                />
                 
            </ul>
            <StoreHours initialHours={storeHours} />
        </main>
    );
}
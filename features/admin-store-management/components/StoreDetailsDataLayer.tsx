import { getStoreHours, getStoreStatus } from "@/domains/store/store.queries";
import AdminStoreDetails from "./AdminStoreDetails";

type Props = {
  storeId: string;
}

export default async function StoreDetailsDataLayer ({ storeId }: Props) {
    const { data: storeHours} = await getStoreHours({storeId})
    const { data: storeStatus } = await getStoreStatus(storeId)
    
    if (!storeHours || !storeStatus) return (
        <section className="flex flex-1 p-6">
            <p className="">hours or status not found </p>
        </section>
    )

    const storeBase = `/stores/${storeId}`;

    return (
        <div className="flex flex-1">
            <AdminStoreDetails
                storeId={storeId} 
                storeBase={storeBase}
                storeHours={storeHours}
                storeInfo={storeStatus.storeInfo}
                storeMetrics={storeStatus.metrics}
            />
        </div>
    );
}
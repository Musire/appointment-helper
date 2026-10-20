import { getActiveStores } from "@/domains/store/store.queries";
import { StoreStep } from "@/features/booking/components";

export default async function BookingPage () {

    const { data } = await getActiveStores()
    if (!data) return null;

    return (
        <div className="flex w-full h-full py-6">
            <StoreStep stores={data} />   
        </div>
    );
}
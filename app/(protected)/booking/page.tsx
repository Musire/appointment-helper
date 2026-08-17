import { getStores } from "@/domains/store/queries/stores";
import { StoreStep } from "@/features/booking";

export default async function BookingPage () {

    const { data } = await getStores()
    if (!data) return null;

    return (
        <div className="flex w-full h-full py-6">
            <StoreStep stores={data} />   
        </div>
    );
}
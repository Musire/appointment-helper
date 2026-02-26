import { StoreStep } from "@/domains/booking";
import { getActiveStores } from "@/lib/queries/stores";
import { SearchParamsType } from "@/lib/queries/types";

export default async function BookingPage ({ searchParams }: SearchParamsType) {
    const stores = await getActiveStores();

    return (
        <div className="">
            <StoreStep {...{stores}} />   
        </div>
    );
}
import { StoreStep } from "@/features/booking";
import { Store } from "@/generated/prisma";
import { getActiveStores } from "@/lib/queries/stores";
import { SearchParamsType } from "@/lib/queries/types";

export default async function BookingPage ({ searchParams }: SearchParamsType) {
    const stores = await getActiveStores() as Store[]

    return (
        <div className="flex w-full h-full ">
            <StoreStep {...{stores}} />   
        </div>
    );
}
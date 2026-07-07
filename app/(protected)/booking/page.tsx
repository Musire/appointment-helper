import { getActiveStores, getStores } from "@/domains/store/queries/stores";
import { StoreStep } from "@/features/booking";
import { Store } from "@/generated/prisma";
import { SearchParamsType } from "@/lib/types";

export default async function BookingPage ({ searchParams }: SearchParamsType) {
    const stores = await getActiveStores() as Store[]

    const res = await getStores()

    return (
        <div className="flex w-full h-full py-6">
            <StoreStep stores={stores} />   
        </div>
    );
}
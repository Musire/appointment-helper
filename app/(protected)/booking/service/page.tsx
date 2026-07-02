import { getStoreService } from "@/domains/store/queries/storeService";
import { ServicesStep } from "@/features/booking";
import { SearchParamsType } from "@/lib/types";

export default async function BookingService ({ searchParams }: SearchParamsType) {
    const params = await(searchParams)
    const {store} = params

    if (!store) return <div className="">some error</div>;

    const services = await getStoreService(store);

    return (
        <div className="flex w-full h-full">
            <ServicesStep {...{services}} />   
        </div>
    );
}
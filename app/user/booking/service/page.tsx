import { ServicesStep } from "@/domains/booking";
import { getStoreService } from "@/lib/queries/storeService";
import { SearchParamsType } from "@/lib/queries/types";

export default async function BookingService ({ searchParams }: SearchParamsType) {
    const params = await(searchParams)
    const {store} = params

    if (!store) return <div className="">some error</div>;

    const services = await getStoreService(store);

    return (
        <div className="">
            <ServicesStep {...{services}} />   
        </div>
    );
}
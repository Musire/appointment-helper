import { getStoreServices } from "@/domains/store/queries/storeService";
import { ServicesStep } from "@/features/booking";
import { SearchParamsType } from "@/lib/types";

export default async function BookingService ({ searchParams }: SearchParamsType) {
    const params = await(searchParams)
    const {store} = params

    if (!store) return <div className="">some error</div>;

    const { data } = await getStoreServices(store)
    if (!data) return <div className="">some error</div>;

    return (
        <div className="flex w-full h-full py-6">
            <ServicesStep services={data} />   
        </div>
    );
}
import { DateTimeStep } from "@/features/booking";
import { getDatetime } from "@/features/booking/queries/getDatetime";
import { SearchParamsType } from "@/lib/types";

export default async function BookingDateTime ({ searchParams }: SearchParamsType) {
    const params = await searchParams
    const { store, staff } = params
    if (!store || !staff) return <div className="">some error</div>;

    const { data } = await getDatetime(store, staff, new Date()) 
    if (!data) return <div className="">some error</div>;

    return (
        <div className="flex w-full h-full py-6">
            <DateTimeStep 
                initialSlots={data} 
                storeId={store}
                barberId={staff} />   
        </div>
    );
}
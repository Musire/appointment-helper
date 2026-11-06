import { getDatetime } from "@/domains/booking/booking.queries";
import { DateTimeStep } from "@/features/booking/components";
import { SearchParamsType } from "@/lib/types";

export default async function BookingDateTime ({ searchParams }: SearchParamsType) {
    const params = await searchParams
    const { store, staff } = params
    if (!store || !staff) return <div className="">some error with params</div>;

    const { data, error } = await getDatetime({
        storeId: store, 
        staffId: staff, 
        targetDate: new Date()
    })

    if (!data) return <div className="">some error with data</div>;

    return (
        <div className="flex flex-1 p-6">
            <DateTimeStep 
                initialSlots={data} 
                storeId={store}
                barberId={staff} />   
        </div>
    );
}
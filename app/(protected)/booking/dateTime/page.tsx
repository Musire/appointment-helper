import { DateTimeStep } from "@/features/booking";
import { getDatetime } from "@/features/booking/queries/getDatetime";
import { SearchParamsType } from "@/lib/types";

export default async function BookingDateTime ({ searchParams }: SearchParamsType) {
    const params = await searchParams
    const { store, staff } = params

    console.log('store:', store, 'staff:', staff)

    if (!store || !staff) return <div className="">some error</div>;

    const { data } = await getDatetime(store, staff, new Date())
    console.log(data)

    return (
        <div className="flex w-full h-full">
            <DateTimeStep />   
        </div>
    );
}
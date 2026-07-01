import { DateTimeStep } from "@/features/booking";
import { SearchParamsType } from "@/lib/queries/types";

export default async function BookingDateTime ({ searchParams }: SearchParamsType) {
    const params = await(searchParams)
    const {store} = params

    if (!store) return <div className="">some error</div>;

    return (
        <div className="flex w-full h-full">
            <DateTimeStep />   
        </div>
    );
}
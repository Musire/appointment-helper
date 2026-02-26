import { DateTimeStep } from "@/domains/booking";
import { SearchParamsType } from "@/lib/queries/types";

export default async function BookingDateTime ({ searchParams }: SearchParamsType) {
    const params = await(searchParams)
    const {store} = params

    if (!store) return <div className="">some error</div>;

    return (
        <div className="">
            <DateTimeStep />   
        </div>
    );
}
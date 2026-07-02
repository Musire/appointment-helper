import { getStoreStaff } from "@/domains/store/queries/getStoreStaff";
import { StaffStep } from "@/features/booking";
import { SearchParamsType } from "@/lib/types";

export default async function BookingStaff ({ searchParams }: SearchParamsType) {
    const params = await(searchParams)
    const {store} = params

    if (!store) return <div className="">some error</div>;

    const staff = await getStoreStaff(store);

    return (
        <div className="flex w-full h-full">
            <StaffStep {...{staff}} />   
        </div>
    );
}
import { StaffStep } from "@/domains/booking";
import { getStoreStaff } from "@/lib/queries/staff";
import { SearchParamsType } from "@/lib/queries/types";

export default async function BookingStaff ({ searchParams }: SearchParamsType) {
    const params = await(searchParams)
    const {store} = params

    if (!store) return <div className="">some error</div>;

    const staff = await getStoreStaff(store);

    return (
        <div className="">
            <StaffStep {...{staff}} />   
        </div>
    );
}
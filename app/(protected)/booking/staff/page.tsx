import { StaffStep } from "@/features/booking";
import { getStoreStaff } from "@/features/booking/queries/getStaff";
import { SearchParamsType } from "@/lib/types";

export default async function BookingStaff ({ searchParams }: SearchParamsType) {
    const params = await(searchParams)
    const {store} = params

    if (!store) return <div className="">some error</div>;

    const { data } = await getStoreStaff(store);

    if (!data) return <div className="">no staff</div>;

    return (
        <div className="flex w-full h-full">
            <StaffStep staff={data} />   
        </div>
    );
}
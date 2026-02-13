import { getActiveStores } from "@/lib/queries/stores";
import { SearchParamsType } from "@/lib/queries/types";
import { getActiveStaff } from "@/lib/queries/users";
import { BookingOrchestrator } from "../components/";

export default async function BookingPage ({ searchParams }: SearchParamsType) {
    const stores = await getActiveStores();
    const staff = await getActiveStaff()
    const query = await searchParams

    return (
        <div className="">
            <BookingOrchestrator
                query={query} 
                stores={stores}
                staff={staff} 
            />
        </div>
    );
}
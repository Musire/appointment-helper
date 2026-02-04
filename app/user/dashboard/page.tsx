import { getActiveStores } from "@/lib/queries/stores";
import BookingOrchestrator from "../components/BookingOrchestrator";
import { SearchParamsType } from "@/lib/queries/types";
import { getActiveStaff } from "@/lib/queries/users";

export default async function UserDashboard ({ searchParams }: SearchParamsType) {
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
import Orchestrator from "@/domains/booking/components/orchestrator/Orchestrator";
import { getActiveStores } from "@/lib/queries/stores";
import { SearchParamsType } from "@/lib/queries/types";
import { getActiveStaff } from "@/lib/queries/users";

export default async function BookingPage ({ searchParams }: SearchParamsType) {
    const stores = await getActiveStores();
    const staff = await getActiveStaff()
    const query = await searchParams

    return (
        <div className="">
            <Orchestrator />
        </div>
    );
}
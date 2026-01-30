import { getActiveStores } from "@/lib/queries/stores";
import StoreSearch from "../components/StoreSearch";

export default async function UserDashboard () {
    const stores = await getActiveStores();

    return (
        <div className="">
            <StoreSearch stores={stores} />
        </div>
    );
}
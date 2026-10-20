import { getActiveStores } from "../../store.queries";
import StoreCard from "./StoreCard";

export default async function StorePanel () {
    const { data:stores } = await getActiveStores()
    if (!stores) return null;

    return (
        <div className="py-6 flex-1 flex-col flex">
            <ul className="grid grid-cols-2 md:grid-cols-2 gap-6 flex-1 content-start">
                {stores.map(s => (
                    <StoreCard key={s.id} store={s} />
                ))}
            </ul>
        </div>
    );
}
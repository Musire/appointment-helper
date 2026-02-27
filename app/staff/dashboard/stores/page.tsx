import { StoreCard } from "@/domains/staff-store";
import { getStores } from "@/lib/queries/stores";

export default async function StorePanel () {
    const stores = await getStores()

    return (
        <div className="py-6">
            <ul className="flex flex-col space-y-6">
                {stores.map(s => (
                    <StoreCard key={s.id} store={s} />
                ))}
            </ul>
        </div>
    );
}
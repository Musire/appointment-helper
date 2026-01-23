import { getStores } from "@/lib/queries/stores";

export default async function StorePanel () {
    const stores = await getStores()

    return (
        <div className="py-6">
            <ul className="">
                {stores.map(s => (
                    <li key={s.id} className="">{s.name}</li>
                ))}
            </ul>
        </div>
    );
}
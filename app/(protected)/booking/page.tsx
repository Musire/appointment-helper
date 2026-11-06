import { getActiveStores } from "@/domains/store/store.queries";
import { StoreStep } from "@/features/booking/components";

export default async function BookingPage () {

    const { data: stores } = await getActiveStores()
    console.log('from server component', stores)

    if (!stores) return (
        <section className="p-6 flex-1 flex">veni vidi vici</section>
    )

    return (
        <div className="flex flex-1 w-full h-full p-6">
            <StoreStep stores={stores} />   
        </div>
    );
}
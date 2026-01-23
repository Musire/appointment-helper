import { AvailabilityForm } from "@/components/forms";
import { getStores } from "@/lib/queries/stores";

export default async function BookingPanel () {
    const real = await getStores()
    
    return (
        <div className="py-6">
            <AvailabilityForm stores={real} />
        </div>
    );
}
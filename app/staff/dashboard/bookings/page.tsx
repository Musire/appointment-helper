import { BusinessHoursForm } from "@/domains/hour-selection";
import { getStores } from "@/lib/queries/stores";

export default async function BookingPanel () {
    const real = await getStores()
    
    return (
        <div className="py-6">
            <BusinessHoursForm />
        </div>
    );
}
import { getAppointmentPool } from "@/domains/appointments/appointment.queries";
import PoolPage from "./PoolPage";

export default async function StaffPoolDataLayer () {

    const selectedDate = new Date();

    const from = new Date(selectedDate);
    from.setHours(0, 0, 0, 0);

    const to = new Date(selectedDate);
    to.setHours(23, 59, 59, 999);

    const payload = {
        from: from.toISOString(),
        to: to.toISOString(),
    };

    const { data: appointments } = await getAppointmentPool(payload)

    return (
        <div className="flex-1 flex p-6  overflow-y-hidden">
            <PoolPage appointments={appointments ?? []} />
        </div>
    );
}
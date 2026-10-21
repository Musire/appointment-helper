import { appointmentMocks } from "@/domains/appointments/appointment.queries";
import PoolPage from "./PoolPage";

export default function StaffPoolDataLayer () {
    const appointments = appointmentMocks
    return (
        <div className="flex-1 flex p-6  overflow-y-hidden">
            <PoolPage appointments={appointments} />
        </div>
    );
}
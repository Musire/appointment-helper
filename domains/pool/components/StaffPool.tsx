import { appointmentMocks } from "@/domains/appointments/appointment.queries";
import { PoolPage } from "@/domains/appointments/components/pool";

export default function StaffPool () {
    const appointments = appointmentMocks
    return (
        <div className="flex-1 flex  overflow-y-hidden">
            <PoolPage appointments={appointments} />
        </div>
    );
}
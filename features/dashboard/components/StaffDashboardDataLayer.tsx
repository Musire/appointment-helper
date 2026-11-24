import { getAppointmentMetrics } from "@/domains/appointments/appiontment.util";
import { getAppointmentPool } from "@/domains/appointments/appointment.queries";
import { getStaffProfileStatus } from "@/domains/profile/profile.queries";
import StaffDashboard from "./StaffDashboard";


export default async function StaffDashboardDataLayer () {
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

    if (!appointments) return (
        <section className="">
            <p className="">not found data</p>
        </section>
    )

    const metrics = getAppointmentMetrics(appointments)
    const { data: status } = await getStaffProfileStatus()

    if (!status) return (
        <section className="">
            <p className="">status cannot be derived</p>
        </section>
    )

    return (
        <div className="flex flex-1">
            <StaffDashboard metrics={metrics} appointments={appointments} status={status} />
        </div>
    );
}
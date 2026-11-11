import { getAppointmentHistory } from "@/domains/appointments/appointment.queries";
import StaffHistory from "./StaffHistory";

export default async function StaffHistoryDataLayer () {
    const selectedDate = new Date();

    const from = new Date(selectedDate);
    from.setHours(0, 0, 0, 0);

    const to = new Date(selectedDate);
    to.setHours(23, 59, 59, 999);

    const payload = {
        from: from.toISOString(),
        to: to.toISOString(),
    };
    
    const { data } = await getAppointmentHistory(payload)

    if (!data) return (
        <section className="">
            <p className="">not found</p>
        </section>
    )

    return (
        <div className="flex flex-1">
            <StaffHistory appointments={data} />
        </div>
    );
}
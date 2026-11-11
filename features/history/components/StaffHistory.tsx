import { getAppointmentHistory } from "@/domains/appointments/appointment.queries";
import BookingHistory from "./staff/BookingHistory";

export default async function StaffHistory () {
    const selectedDate = new Date();

    const from = new Date(selectedDate);
    from.setHours(0, 0, 0, 0);

    const to = new Date(selectedDate);
    to.setHours(23, 59, 59, 999);

    const payload = {
        from: from.toISOString(),
        to: to.toISOString(),
    };
    const { data: appointments } = await getAppointmentHistory(payload)

    if (!appointments) return (
        <section className="">
            <p className="">not found data</p>
        </section>
    )
    return (
        <div className="pt-6 w-full ">
            <BookingHistory history={appointments} />
        </div>
    );
}
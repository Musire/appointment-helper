import { getAppointmentHistory } from "@/domains/appointments/appointment.queries";
import { BookingHistory } from "./staff";

export default async function EnduserHistory () {

    const selectedDate = new Date();

    const from = new Date(selectedDate);
    const day = from.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    from.setDate(from.getDate() + diff);
    from.setHours(0, 0, 0, 0);

    // Monday of the following week
    const to = new Date(from);
    to.setDate(to.getDate() + 7);
    to.setHours(0, 0, 0, 0);

    const payload = {
        from: from.toISOString(),
        to: to.toISOString(),
    };
    const { data: appointments, error } = await getAppointmentHistory(payload)

    console.log(error)
    if (!appointments) return (
        <section className="">
            <p className="">not found data</p>
        </section>
    )
    
    return (
        <div className="px-6 w-full flex flex-1 ">
            <BookingHistory appointments={appointments} />
        </div>
    );
}
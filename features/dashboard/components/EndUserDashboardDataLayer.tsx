import { getFutureUserAppointments } from "@/domains/appointments/appointment.queries";
import EnduserDashboard from "./EnduserDashboard";

export default async function EndUserDashboardDataLayer () {

    const { data: appointments } = await getFutureUserAppointments()

    if (!appointments) {
        return (
            <section className="">
                <p className="">Error with the data</p>
            </section>
        )
    }

    return (
        <div className="flex flex-1">
            <EnduserDashboard appointments={appointments} />
        </div>
    );
}
import { getAppointments } from "@/domains/appointments/queries/getUpcomingAppointments";
import { LaterAppointments } from "@/domains/upcoming/components";

export default async function BookingPanel () {

    const appointments = getAppointments()
    
    return (
        <div className="py-6 flex  w-full flex-col space-y-6">
            <LaterAppointments
                appointments={appointments}
            />
        </div>
    );
}
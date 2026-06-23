import { AppointmentWithRelations } from "@/domains/appointments/queries/getUpcomingAppointments";
import AppointmentCard from "../cards/AppointmentCard";

type props = {
    appointments: AppointmentWithRelations[]
}

export default function LaterAppointments ({ appointments }: props) {
    return (
        <ul className="flex-col xs:grid-cols-1 grid gap-4 md:grid-cols-2 flex-1 space-y-2  pr-4 pb-6">
            {appointments.map(a => (
                <AppointmentCard key={a.id} data={a} />
            ))}
        </ul>
    );
}
import { Appointment } from "@/generated/prisma";
import AppointmentCard from "../cards/AppointmentCard";

type props = {
    appointments: Appointment[]
}

export default function LaterAppointments ({ appointments }: props) {
    return (
        <>
            <h2 className="" >Later Today</h2>
            <ul className="flex-col flex space-y-2 overflow-y-scroll h-[37dvh] scrollbar-adjust pr-4">
                {appointments.map(a => (
                    <AppointmentCard key={a.id} data={a} />
                ))}
            </ul>
        </>
    );
}
import { H2 } from "@/components/UI";
import { Appointment } from "@/generated/prisma";
import AppointmentCard from "../cards/AppointmentCard";

type props = {
    appointments: Appointment[]
}

export default function LaterAppointments ({ appointments }: props) {
    return (
        <>
            <H2 className="text-main text-fluid-lg" >Later Today</H2>
            <ul className="flex-col flex space-y-2 overflow-y-scroll md:h-[40dvh] xs:max-md:h-[47dvh] scrollbar-adjust pr-4 pb-6">
                {appointments.map(a => (
                    <AppointmentCard key={a.id} data={a} />
                ))}
            </ul>
        </>
    );
}
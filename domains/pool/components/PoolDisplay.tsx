import AppointmentCard, { ExtendedUserAppointment } from "@/features/history/components/staff/cards/AppointmentCard";

type Props = {
    appointments: ExtendedUserAppointment[]
}

export default function PoolDisplay ({
    appointments
}: Props) {
    return (
        <ul className=" flex flex-col space-y-2 h-full overflow-y-auto scrollbar-adjust pr-4  ">
            {appointments.map(p => {
                return (
                    <AppointmentCard key={p.id} appointment={p} />
                )
            })}
        </ul>
    );
}
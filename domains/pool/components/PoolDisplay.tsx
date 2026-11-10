import { ExtendedUserAppointment } from "@/domains/appointments/appointment.types";
import AppointmentCard from "@/features/history/components/staff/cards/AppointmentCard";
import { RefreshCw } from "lucide-react";

type Props = {
    appointments: ExtendedUserAppointment[];
    loading: boolean;
}

export default function PoolDisplay ({
    appointments,
    loading
}: Props) {
    return (
        <ul className=" flex flex-col space-y-2 h-full overflow-y-auto scrollbar-adjust pr-4  ">
            {!loading && !!appointments.length && appointments.map(p => {
                return (
                    <AppointmentCard key={p.id} appointment={p} />
                )
            })}
            {!loading && !appointments.length && (
                <div className="flex-1 centered text-else">No hay citas</div>
            )
            }
            {loading && (
                <div className="centered flex-1">
                    <RefreshCw className="animate-spin" />
                </div>
            )}
        </ul>
    );
}
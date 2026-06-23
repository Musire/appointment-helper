import { AppointmentWithRelations } from "@/domains/appointments/queries/getUpcomingAppointments";
import { formatTime } from "@/lib/time";

type Props = {
    data: AppointmentWithRelations
}

export default function NextAppointment ({ data }: Props) {
    const {startTime, client} = data
    return (
        <article className="surface-1 max-w-xl border-2 border-border p-6 flex space-x-4">
            <div className="bg-else size-4 rounded-full" />
            <div className="flex flex-col space-y-1 -translate-y-1">
                <p className="text-main">Next Appointment</p>
                <p className="text-else">{`${formatTime(startTime)} - ${client.fullName}`}</p>
                <p className="text-else">{`Starts in 20 mins`}</p>
            </div>
        </article>
    );
}
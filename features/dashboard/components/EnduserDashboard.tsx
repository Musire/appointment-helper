import { ExtendedUserAppointment } from "@/domains/appointments/appointment.types";
import AppointmentCard from "@/features/history/components/staff/cards/AppointmentCard";

export type MockAppointmentCard = {
    id: string;
    href: string;
    value: string;
}

type Props = {
  appointments: ExtendedUserAppointment[]
}


export default function EnduserDashboard ({ appointments }: Props) {
    return (
        <main className="p-6 stacked flex-1 min-h-0 overflow-hidden ">
            <div className="flex-1 min-h-0 flex flex-col space-y-4 overflow-y-hidden">
                <h3 className="shrink-0">Upcoming appointments</h3>
                <div className="  min-h-0 flex flex-col flex-1 gap-y-4 overflow-y-auto scrollbar-adjust">
                    { !appointments.length && 
                        (
                            <p className="text-xs text-else flex-1 centered">No appointments </p>
                        )
                    }
                    {
                        !!appointments.length && appointments.map(a => <AppointmentCard key={a.id} appointment={a} />)
                        
                    }
                </div>
            </div>
        </main>
    );
}

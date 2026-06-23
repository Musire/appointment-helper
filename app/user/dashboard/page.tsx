import { getAppointments } from "@/domains/appointments/queries/getUpcomingAppointments";
import { LaterAppointments } from "@/domains/upcoming/components";


export default function UpcomingPage () {
    const appointments = getAppointments()
    
    return (
        <div className="py-6 flex flex-col w-full  space-y-6 h-[80dvh]">
            <LaterAppointments {...{appointments}} />
        </div>
    );
}

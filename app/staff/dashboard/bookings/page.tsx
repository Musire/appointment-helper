import { NextAppointment, LaterAppointments } from "@/domains/upcoming/components";
import { appointments } from "@/domains/upcoming/mockData/test-appointments"

export default async function BookingPanel () {

    
    return (
        <div className="py-6 flex flex-col space-y-6">
            <NextAppointment />
            <LaterAppointments {...{appointments}} />
        </div>
    );
}
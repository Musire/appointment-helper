import { getAppointmentHistory } from "@/domains/appointments/queries/getHistoryItems";
import { BookingHistory } from "@/domains/staff-history";

export default function EnduserHistory () {
    const AppointmentHistory = getAppointmentHistory()
    return (
        <div className="pt-6 w-full ">
            <BookingHistory history={AppointmentHistory} />
        </div>
    );
}
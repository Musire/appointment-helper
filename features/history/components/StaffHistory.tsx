import { getAppointmentHistory } from "@/domains/appointments/queries/getHistoryItems";
import { BookingHistory } from "../staff-history";

export default function StaffHistory () {
    const AppointmentHistory = getAppointmentHistory()
    return (
        <div className="pt-6 w-full ">
            <BookingHistory history={AppointmentHistory} />
        </div>
    );
}
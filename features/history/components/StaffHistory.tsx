import { getAppointmentHistory } from "@/domains/appointments/appointment.queries";
import BookingHistory from "./staff/BookingHistory";

export default function StaffHistory () {
    const AppointmentHistory = getAppointmentHistory()
    return (
        <div className="pt-6 w-full ">
            <BookingHistory history={AppointmentHistory} />
        </div>
    );
}
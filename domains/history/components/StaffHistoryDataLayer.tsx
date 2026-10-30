import { getAppointmentHistory } from "@/domains/appointments/appointment.queries";
import StaffHistory from "./StaffHistory";

export default function StaffHistoryDataLayer () {
    const AppointmentHistory = getAppointmentHistory()

    return (
        <div className="flex flex-1">
            <StaffHistory appointments={AppointmentHistory} />
        </div>
    );
}
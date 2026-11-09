import { getAppointmentHistory } from "@/domains/appointments/appointment.queries";
import StaffHistory from "./StaffHistory";

export default function StaffHistoryDataLayer () {
    const { data } = getAppointmentHistory()

    return (
        <div className="flex flex-1">
            <StaffHistory appointments={data} />
        </div>
    );
}
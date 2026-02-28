import { BookingHistory, AppointmentHistory } from "@/domains/staff-history";

export default function HistoryPanel () {
    return (
        <div className="py-6">
            <BookingHistory history={AppointmentHistory} />
        </div>
    );
}
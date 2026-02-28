import { AppointmentHistory, BookingHistory } from "@/domains/staff-history";

export default function HistoryPage () {
    return (
        <div className=" ">
            <BookingHistory history={AppointmentHistory} />
        </div>
    );
}
import { GroupedAppointments } from "../model/types";
import { HistoryDisplay } from "./";

type Props = {
    history: GroupedAppointments
}

export default function BookingHistory({ history }: Props) {
    const sortedDateEntries = Object.entries(history).sort(
        ([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime()
    );

    return (
        <div className="flex py-4 flex-col gap-8 h-[70dvh] overflow-y-scroll scrollbar-adjust pr-4">
            {sortedDateEntries.map(([date, appointments]) => (
                <HistoryDisplay key={date} {...{date}} {...{appointments}} />
            ))}
        </div>
    );
}

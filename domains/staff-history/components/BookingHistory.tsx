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
        <div className="flex flex-col gap-8 p-6 h-[66dvh] overflow-y-scroll scrollbar-none">
            {sortedDateEntries.map(([date, appointments]) => (
                <HistoryDisplay key={date} {...{date}} {...{appointments}} />
            ))}
        </div>
    );
}

import { AppointmentHistoryItem } from "@/domains/appointments/queries/getHistoryItems";
import { HistoryDisplay } from "./containers";

type Props = {
    history: AppointmentHistoryItem[]
}

export default function BookingHistory({ history }: Props) {
    const sortedHistory = [...history].sort(
        (a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime()
    )

    const groupedHistory = sortedHistory.reduce<Record<string, AppointmentHistoryItem[]>>((acc, appointment) => {
        const date = appointment.scheduledAt.toISOString().split('T')[0]

        if (!acc[date]) {
            acc[date] = []
        }

        acc[date].push(appointment)

        return acc
    }, {})

    const dateEntries = Object.entries(groupedHistory)

    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 py-4 gap-8 ">
            {dateEntries.map(([date, appointments]) => (
                <HistoryDisplay
                    key={date}
                    date={date}
                    appointments={appointments}
                />
            ))}
        </div>
    );
}

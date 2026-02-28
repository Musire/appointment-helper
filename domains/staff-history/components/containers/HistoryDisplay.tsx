import { AppointmentWithRelations } from "../../model/types";
import { HistoryCard } from "../cards";

type props = {
    date: string;
    appointments: AppointmentWithRelations[]
}

export default function HistoryDisplay ({ date, appointments }: props) {
    return (
        <section  className="flex flex-col gap-3 divide-y-2 divide-whitesmoke/30">
            <h2 className="text-sm font-bold text-whitesmoke/87 uppercase tracking-wider  pb-4">
                {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                })}
            </h2>
            <ul className="flex flex-col gap-4 pl-6 pt-6">
                {appointments.map((a) => (
                    <HistoryCard key={a.id} data={a} />
                ))}
            </ul>
        </section>
    );
}
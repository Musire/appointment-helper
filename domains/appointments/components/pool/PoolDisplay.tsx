import { AppointmentDetails } from "../../queries/getAppointmentDetails";
import PoolCard from "./PoolCard";

type Props = {
    appointments: AppointmentDetails[]
}

export default function PoolDisplay ({
    appointments
}: Props) {
    return (
        <ul className=" flex flex-col space-y-2 h-full overflow-y-auto scrollbar-adjust pr-4  ">
            {appointments.map(p => {
                return (
                    <PoolCard key={p.id} appointment={p} />
                )
            })}
        </ul>
    );
}
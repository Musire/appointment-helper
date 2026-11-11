import { ExtendedUserAppointment } from "@/domains/appointments/appointment.types";

type Props = {
    history: ExtendedUserAppointment[]
}

export default function BookingHistory({ history }: Props) {

    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 py-4 gap-8 ">
            <p className="">pending</p>
        </div>
    );
}

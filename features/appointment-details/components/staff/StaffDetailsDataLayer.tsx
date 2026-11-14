import { getAppointmentDetails } from "@/domains/appointments/appointment.queries";
import StaffDetails from "./StaffDetails";

type Props = {
  appointmentId: string;
}

export default async function StaffDetailsDataLayer ({ appointmentId }: Props) {
    const { data: appointment } = await getAppointmentDetails({ id: appointmentId})

    if (!appointment) {
        return (
            <section className="">
                <p className="">error with data fetching</p>
            </section>
        )
    }

    return (
        <div className="flex flex-1">
            <StaffDetails appointment={appointment} />
        </div>
    );
}
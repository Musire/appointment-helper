import { getAppointmentDetails } from "@/domains/appointments/appointment.queries";
import { Role } from "../../actionConfig";
import AppointmentDetailsView from "./AppointmentDetailsView";

type Props = {
  appointmentId: string;
  role: Role;
}

export default async function AppointmentDetailsDataLayer ({ appointmentId, role }: Props) {
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
            <AppointmentDetailsView role={role} appointment={appointment} />
        </div>
    );
}
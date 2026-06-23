import { StaffDetails } from "@/domains/appointments/components/details";
import { getAppointmentDetails } from "@/domains/appointments/queries/getAppointmentDetails";
import { ParamsType } from "@/lib/queries/types";

// FIX: Use ParamsType directly as the Props type instead of nesting it
type Props = ParamsType<{ appointmentId: string }>;

export default async function AppointmentDetailsPage({
    params
}: Props) {
    // Now params correctly evaluates to Promise<{ appointmentId: string }>
    const { appointmentId } = await params;
    const appointment = getAppointmentDetails(appointmentId);

    if (!appointment) {
        return (
            <div className="">no appointment found</div>
        )
    }
    
    return (
        <div className="">
            <StaffDetails appointment={appointment} />
        </div>
    );
}

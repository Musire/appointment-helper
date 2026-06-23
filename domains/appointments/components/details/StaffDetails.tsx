import { getAppointmentDetails } from "@/domains/appointments/queries/getAppointmentDetails";
import { ParamsType } from "@/lib/queries/types";
import StaffAppointmentDetails from "./StaffAppointmentDetails";

// FIX: Use ParamsType directly as the Props type instead of nesting it
type Props = ParamsType<{ appointmentId: string }>;

export default async function StaffDetails({
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
        <div className="flex-1 overflow-y-auto scrollbar-none">
            <StaffAppointmentDetails appointment={appointment} />
        </div>
    );
}

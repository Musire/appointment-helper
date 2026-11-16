
import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import AppointmentDetailsDataLayer from "@/features/appointment-details/components/shared/AppointmentDetailsDataLayer";
import { ParamsType } from "@/lib/types";

type Props = ParamsType<{ appointmentId: string }>;

export default async function AppointmentDetailsPage ({ params }: Props) {
  const { appointmentId } = await params
  return (
    <RoleRenderer roles={{
        STAFF: <AppointmentDetailsDataLayer 
            appointmentId={appointmentId}
            role="STAFF" 
          />,
        USER: <AppointmentDetailsDataLayer 
            appointmentId={appointmentId} 
            role="USER"
          />
      }} 
    />
  )
 
}
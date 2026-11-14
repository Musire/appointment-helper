
import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import StaffDetailsDataLayer from "@/features/appointment-details/components/staff/StaffDetailsDataLayer";
import { ParamsType } from "@/lib/types";

type Props = ParamsType<{ appointmentId: string }>;

export default async function AppointmentDetailsPage ({ params }: Props) {
  const { appointmentId } = await params
  return (
    <RoleRenderer roles={{
        STAFF: <StaffDetailsDataLayer appointmentId={appointmentId} />
      }} 
    />
  )
 
}
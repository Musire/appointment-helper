import { AppointmentDetails } from "@/domains/appointments/components/details";
import { ParamsType } from "@/lib/queries/types";

export default async function AppointmentDetailPage({
  params,
}: ParamsType<{ appointmentId: string }>) {

  const { appointmentId } = await params

  return (
    <div className="pt-6 w-full">
      <AppointmentDetails />
    </div>
  )
}
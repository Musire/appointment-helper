import { BodySm } from "@/components/UI";
import { AppointmentCard } from "@/domains/appointments/components/dashboard";
import { appointmentMocks, filterAppointmentToday } from "@/domains/appointments/queries/getAppointmentDetails";
import { QrButton } from "@/features/qr-code/components";
import Link from "next/link";

export default async function StaffDashboard () {
  
  const appointments = appointmentMocks
  const filtered = filterAppointmentToday(appointments)

  return (
    <div className=" relative stacked py-6 flex-1 overflow-hidden">
      <ul className="grid grid-cols-3 h-40 shrink-0 gap-x-4 w-full">
        <li className="bg-surface-1 w-full rounded-md h-full shrink-0"></li>
        <li className="bg-surface-1 w-full rounded-md"></li>
        <li className="bg-surface-1 w-full rounded-md"></li>
      </ul>
      <QrButton />
      <div className="flex-col flex space-y-2 flex-1 overflow-y-hidden">
        <span className="spaced">
          <BodySm className="">Today's Schedule</BodySm>
          <Link href="pool" className="">View all</Link>
        </span>
        <ul className="flex flex-col flex-1 overflow-y-auto pr-4 scrollbar-adjust">
          {filtered.map(a => {
            return <AppointmentCard key={a.id} appointment={a} />
          })}
        </ul>
      </div>
    </div>
  );
}
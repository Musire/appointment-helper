import { Body, BodySm } from "@/components/UI";
import { AppointmentCard } from "@/domains/appointments/components/dashboard";
import { appointmentMocks, filterAppointmentToday, getAppointmentMetrics } from "@/domains/appointments/queries/getAppointmentDetails";
import { QrButton } from "@/features/qr-code/components";
import { StatCard } from "@/features/staff-dashboard-stats/components";
import Link from "next/link";

export default async function StaffDashboard () {
  
  const appointments = appointmentMocks
  const filtered = filterAppointmentToday(appointments)
  const { pending, checkedIn, completed } = getAppointmentMetrics(filtered)

  return (
    <div className=" relative stacked py-6 flex-1 overflow-hidden">
      <ul className="grid grid-cols-3 h-40 shrink-0 gap-x-4 w-full">
        <StatCard variant='pendiente' value={pending} />
        <StatCard variant='checkin' value={checkedIn} />
        <StatCard variant='finalizado' value={completed} />
      </ul>
      <div className="flex-col flex space-y-2 flex-1 overflow-y-hidden surface-1 p-4">
        <span className="spaced">
          <BodySm className="text-lg">Horario de Hoy</BodySm>
          <Link href="pool" className="hover:text-main text-main/80">Ver Todas</Link>
        </span>
        <ul className="flex flex-col flex-1 overflow-y-auto pr-4 scrollbar-adjust">
          {filtered.map(a => {
            return <AppointmentCard key={a.id} appointment={a} />
          })}
          {!filtered.length && (
            <Body className="mx-auto my-auto text-else">No hay citas</Body>
          )}
        </ul>
      </div>
      <QrButton />
    </div>
  );
}
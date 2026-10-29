import { Body, BodySm } from "@/components/ui";
import { appointmentMocks, filterAppointmentToday, getAppointmentMetrics } from "@/domains/appointments/appointment.queries";
import { AppointmentCard } from "@/domains/appointments/components/dashboard";
import { QrButton } from "@/features/qr-code/components";
import { StatCard } from "@/features/staff-dashboard-stats/components";
import Link from "next/link";

export default async function StaffDashboard () {
  
  const filtered = filterAppointmentToday(appointmentMocks)
  const { pending, checkedIn, completed } = getAppointmentMetrics(filtered)

  return (
    <div className=" relative stacked p-6 flex-1 overflow-hidden">
      <div className="self-end w-32 normal-space h-8 rounded-full bg-surface-1 centered">active</div>
      <ul className="grid grid-cols-3 h-32 shrink-0 gap-x-4 w-full">
        <StatCard variant='pendiente' value={pending} />
        <StatCard variant='checkin' value={checkedIn} />
        <StatCard variant='finalizado' value={completed} />
      </ul>
      <div className="flex-col flex space-y-2 flex-1 overflow-y-hidden p-4">
        <span className="spaced">
          <BodySm className="text-base font-medium">Horario de Hoy</BodySm>
          <Link href="pool" className="hover:text-main text-sm cursor-pointer text-main/80">Ver Todas</Link>
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
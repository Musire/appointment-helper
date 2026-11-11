import { Body, BodySm } from "@/components/ui";
import { getAppointmentMetrics } from "@/domains/appointments/appiontment.util";
import { getAppointmentPool } from "@/domains/appointments/appointment.queries";
import AppointmentCard from "@/features/history/components/staff/cards/AppointmentCard";
import { QrButton } from "@/features/qr-code/components";
import { StatCard } from "@/features/staff-dashboard-stats/components";
import Link from "next/link";
import AccountStatus from "./AccountStatus";

export default async function StaffDashboard () {

  const selectedDate = new Date();

  const from = new Date(selectedDate);
  from.setHours(0, 0, 0, 0);

  const to = new Date(selectedDate);
  to.setHours(23, 59, 59, 999);

  const payload = {
      from: from.toISOString(),
      to: to.toISOString(),
  };
  
  const { data: appointments } = await getAppointmentPool(payload)

  if (!appointments) return (
    <section className="">
      <p className="">not found data</p>
    </section>
  )

  const { pending, checkedIn, completed } = getAppointmentMetrics(appointments)

  return (
    <div className=" relative stacked p-6 flex-1 overflow-hidden">
      <div className="spaced">
        <QrButton />
        <AccountStatus
          active={false}
          requirements={[
            { label: "Complete profile", completed: true },
            { label: "Upload documents", completed: false },
            { label: "Store approval", completed: false },
          ]}
        />
      </div>
      <ul className="grid grid-cols-3 h-32 shrink-0 gap-x-4 w-full">
        <StatCard variant='pendiente' value={pending} />
        <StatCard variant='checkin' value={checkedIn} />
        <StatCard variant='finalizado' value={completed} />
      </ul>
      <div className="flex-col flex space-y-2 flex-1 overflow-y-hidden p-4">
        <span className="spaced">
          <BodySm className="text-base font-medium">Horario de Hoy</BodySm>
          <Link href="/pool" className="hover:text-main text-sm cursor-pointer text-main/80">Ver Todas</Link>
        </span>
        <ul className="flex flex-col flex-1 overflow-y-auto pr-4 scrollbar-adjust">
          {appointments.map(a => {
            return <AppointmentCard key={a.id} appointment={a} />
          })}
          {!appointments.length && (
            <Body className="mx-auto my-auto text-else">No hay citas</Body>
          )}
        </ul>
      </div>
    </div>
  );
}
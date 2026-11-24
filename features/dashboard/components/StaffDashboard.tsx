import { Body, BodySm } from "@/components/ui";
import { AppointmentDetails } from "@/domains/appointments/appointment.types";
import { type AccountStatus as AccountStatusType, type Metrics } from "@/domains/profile/profile.types";
import AppointmentCard from "@/features/history/components/staff/cards/AppointmentCard";
import { QrButton } from "@/features/qr-code/components";
import { StatCard } from "@/features/staff-dashboard-stats/components";
import Link from "next/link";
import AccountStatus from "./AccountStatus";

type Props = {
  metrics: Metrics;
  appointments: AppointmentDetails[];
  status: AccountStatusType
}

export default async function StaffDashboard ({ 
  metrics, 
  appointments, 
  status 
}: Props) {

  return (
    <div className=" relative stacked p-6 flex-1 overflow-hidden">
      <div className="spaced">
        <QrButton />
        <AccountStatus
          active={status?.active}
          requirements={status?.requirements}
        />
      </div>
      <ul className="grid grid-cols-3 h-32 shrink-0 gap-x-4 w-full">
        <StatCard variant='pendiente' value={metrics?.pending} />
        <StatCard variant='checkin' value={metrics?.checkedIn} />
        <StatCard variant='finalizado' value={metrics?.completed} />
      </ul>
      <div className="flex-col flex space-y-2 flex-1 overflow-y-hidden p-4">
        <span className="spaced">
          <BodySm className="text-base font-medium">Horario de Hoy</BodySm>
          <Link href="/pool" className="hover:text-main text-sm cursor-pointer text-main/80">Ver Todas</Link>
        </span>
        <ul className="flex flex-col flex-1 overflow-y-auto pr-4 scrollbar-adjust">
          {appointments?.map(a => {
            return <AppointmentCard key={a.id} appointment={a} />
          })}
          {!appointments?.length && (
            <Body className="mx-auto my-auto text-else">No hay citas</Body>
          )}
        </ul>
      </div>
    </div>
  );
}
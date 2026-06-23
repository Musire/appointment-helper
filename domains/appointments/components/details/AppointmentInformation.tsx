import Row from "./Row"

type AppointmentInformationCardProps = {
  clientName: string
  barberName?: string
  service?: string
  scheduledAt: Date
}

export default function AppointmentInformation({
  clientName,
  barberName,
  service,
  scheduledAt,
}: AppointmentInformationCardProps) {
  return (
    <section className="surface-1 w-full p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Appointment Information
      </h2>

      <div className="space-y-2">
        <Row label="Client" value={clientName} />
        {barberName && <Row label="Barber" value={barberName} />}
        {service && <Row label="Service" value={service} />}
        <Row label="Date & Time" value={scheduledAt.toLocaleString()} />
      </div>
    </section>
  )
}
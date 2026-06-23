import Row from "./Row"

type SchedulingInformationCardProps = {
  createdAt: Date
}

export default function SchedulingInformation({
  createdAt,
}: SchedulingInformationCardProps) {
  return (
    <section className="p-4 surface-1">
      <h2 className="mb-4 text-lg font-semibold">
        Scheduling Information
      </h2>

      <div className="space-y-2">
        <Row
          label="Created On"
          value={createdAt.toLocaleString()}
        />
      </div>
    </section>
  )
}
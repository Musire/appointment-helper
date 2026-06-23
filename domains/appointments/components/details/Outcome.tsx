import StatusPill from "./StatusPill"

type OutcomeCardProps = {
  status: 'completed' | 'cancelled' | 'noshow' | 'pending' | 'inprogress' | 'checkedin'
}

export default function Outcome({
  status,
}: OutcomeCardProps) {
  return (
    <section className="surface-1 p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Outcome
      </h2>

      <div className="flex flex-wrap gap-2">
        <StatusPill
          label="Completed"
          isActive={status === 'completed'}
        />

        <StatusPill
          label="No Show"
          isActive={status === 'noshow'}
        />
        <StatusPill
          label="Cancelled"
          isActive={status === 'cancelled'}
        />

      </div>
    </section>
  )
}
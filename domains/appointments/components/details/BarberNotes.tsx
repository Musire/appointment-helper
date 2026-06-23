

type BarberNotesCardProps = {
  notes: string | undefined
}

export default function BarberNotes({
  notes,
}: BarberNotesCardProps) {
  return (
    <section className="surface-1 p-4 md:row-start-1 md:col-start-2">
      <h2 className="mb-4 text-lg font-semibold">
        Barber Notes
      </h2>

      <p className="whitespace-pre-wrap">
        {notes || 'No notes available.'}
      </p>
    </section>
  )
}
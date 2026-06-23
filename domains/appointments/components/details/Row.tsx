type RowProps = {
  label: string
  value: React.ReactNode
}

export default function Row({
  label,
  value,
}: RowProps) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="text-right font-medium">
        {value}
      </span>
    </div>
  )
}
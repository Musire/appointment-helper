type StatusPillProps = {
  label: string
  isActive?: boolean
}

export default function StatusPill({
  label,
  isActive = false,
}: StatusPillProps) {

  const activeStyling = "border-primary text-primary font-medium"
  const inactiveStyling = "text-else"
  const styling = isActive ? activeStyling : inactiveStyling 
  return (
    <div
      className={`rounded-full border px-3 py-1 text-sm ${styling}`}
    >
      {label}
    </div>
  )
}
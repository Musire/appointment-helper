export function fromMins(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12

  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`
}

export function labelToMinutes(label: string) {
  const [time, period] = label.split(' ')
  const [hours, minutes] = time.split(':').map(Number) ?? [0,0]
  let adjustedHours = hours

  if (period === 'PM' && adjustedHours !== 12) adjustedHours += 12
  if (period === 'AM' && adjustedHours === 12) adjustedHours = 0

  return adjustedHours * 60 + minutes
}

export function getOverlapError(dayOverlapErrors?: Record<string, boolean>) {
  if (!dayOverlapErrors) return null

  const days = Object.entries(dayOverlapErrors)
    .filter(([_, value]) => value)
    .map(([day]) => day)

  if (days.length === 0) return null

  return `Overlapping schedules on days ${days.join(', ')}`
}
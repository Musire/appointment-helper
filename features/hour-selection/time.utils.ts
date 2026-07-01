export function fromMins(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12

  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`
}

export function labelToMinutes(label: string) {
  const [time, period] = label.split(' ')
  let [hours, minutes] = time.split(':').map(Number)

  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0

  return hours * 60 + minutes
}

export function getOverlapError(dayOverlapErrors?: Record<string, boolean>) {
  if (!dayOverlapErrors) return null

  const days = Object.entries(dayOverlapErrors)
    .filter(([_, value]) => value)
    .map(([day]) => day)

  if (days.length === 0) return null

  return `Overlapping schedules on days ${days.join(', ')}`
}
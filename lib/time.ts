import dayjs from "dayjs"

export function timeAgo(date: string | Date) {
  const now = dayjs()
  const then = dayjs(date)

  const diffMinutes = now.diff(then, "minute")
  if (diffMinutes < 60) return `${diffMinutes}m`

  const diffHours = now.diff(then, "hour")
  if (diffHours < 24) return `${diffHours}h`
  
  const diffDays = now.diff(then, "day")
  return `${diffDays}d`
}

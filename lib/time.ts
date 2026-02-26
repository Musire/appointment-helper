import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from "dayjs/plugin/customParseFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import { v4 as uuidv4 } from "uuid";

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.extend(isoWeek);

type ZonedDateParts = {
  date: string   // YYYY-MM-DD
  time: string   // HH:mm
}

type Input = {
  date: string        // YYYY-MM-DD
  time: string        // hh:mm A
  tz: string
}



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

export function convertUTC( utcIso: string, tz: string): ZonedDateParts {
  if (!utcIso) {
    throw new Error('utcIso is required')
  }

  if (!tz) {
    throw new Error('timezone is required')
  }

  const zoned = dayjs.utc(utcIso).tz(tz)

  return {
    date: zoned.format('YYYY-MM-DD'),
    time: zoned.format('hh:mm A')
  }
}


export function convertToUTC({ date, time, tz }: Input): string {
  if (!date) throw new Error("date is required")
  if (!time) throw new Error("time is required")
  if (!tz) throw new Error("timezone is required")

  const localDateTime = `${date} ${time}`

  const zoned = dayjs.tz(localDateTime, "YYYY-MM-DD hh:mm A", tz)

  return zoned.utc().toISOString()
}

export function getMeridiem(timeString: string) {
  return dayjs(timeString, "HH:mm").format("hh:mm A");
}

export function generateCurrentWeek() {
  const startOfWeek = dayjs().startOf("isoWeek"); // Monday

  return Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, "day");

    return {
      id: uuidv4(),
      day: date.format("ddd").toLowerCase(), // mon, tue, wed...
      date: date, // dayjs instance
    };
  });
}
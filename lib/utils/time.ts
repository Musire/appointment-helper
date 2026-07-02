import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
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

export function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}


const TIME_FORMAT = "hh:mm A";

// 1. Define the TypeScript Overloads (Tells TS exactly what to expect)
export function toMins(time: string[]): number[];
export function toMins(time: string): number;

// 2. Implement the actual function execution logic
export function toMins(time: string | string[]): number | number[] {
  if (Array.isArray(time)) {
    return time.map((t) => {
      const parsed = dayjs.utc(t, TIME_FORMAT);
      return parsed.hour() * 60 + parsed.minute();
    });
  }

  // TypeScript now knows 'time' can ONLY be a single string here
  const parsed = dayjs.utc(time, TIME_FORMAT);
  return parsed.hour() * 60 + parsed.minute();
}

export function minsToLabel(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12

  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`
}

export function labelToMins(label: string) {
  const [time, period] = label.split(' ')
  let [hours, minutes] = time.split(':').map(Number)

  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0

  return hours * 60 + minutes
}

export function formatAppointmentDateTime(date: Date): { dateStr: string; timeStr: string } {
  // 1. Format the date part: "May 25, 2026 (Mon)"
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const month = months[date.getMonth()];
  const dayNum = date.getDate();
  const year = date.getFullYear();
  const weekday = days[date.getDay()].toLowerCase(); // Enforces lower-case "(sat)"

  const dateStr = `${month} ${dayNum}, ${year} (${weekday})`;

  // 2. Format the time part: "10:30 AM"
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'AM' : 'PM';

  hours = hours % 12;
  hours = hours ? hours : 12; // Converts '0' hours to '12'

  const timeStr = `${hours}:${minutes} ${ampm}`;

  return { dateStr, timeStr };
}

export type CheckedStatus = 'pending' | 'offset';

export function checkPendingTimeWindow(scheduledAt: Date): CheckedStatus {
  const now = dayjs('2026-06-12T14:00:00Z');
  const appointmentTime = dayjs(scheduledAt);

  const minutesUntilAppointment = appointmentTime.diff(now, 'minute');

  if (minutesUntilAppointment > 30 || minutesUntilAppointment < -10) {
    return 'offset';
  }

  return 'pending'; 
}

export function toInteger(timeStr: string): number {
  // Directly splits "09:30 PM" into ["09", "30 PM"]
  const [hoursPart, rest] = timeStr.split(':');
  const [minutesPart, meridiem] = rest.split(' ');

  let hours = Number(hoursPart);
  const minutes = Number(minutesPart);
  const isPM = meridiem.toUpperCase() === "PM";

  // Standard 12-hour to 24-hour conversion math
  if (isPM && hours < 12) {
    hours += 12;
  } else if (!isPM && hours === 12) {
    hours = 0;
  }

  return (hours * 3600) + (minutes * 60);
}

export function toMeridiem(totalSeconds: number): string {
  const hours24 = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const meridiem = hours24 >= 12 ? "PM" : "AM";

  // Convert 24-hour back to 12-hour
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;

  const paddedHours = String(hours12).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${paddedHours}:${paddedMinutes} ${meridiem}`;
}


export function formatIsoDate(
  isoString: string, 
  locale: string = 'en-US'
): string {
  const date = new Date(isoString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short', // Use 'long' for "November", '2-digit' for "11"
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(
  date: Date,
  locale: string = 'en-US'
): string {
  // Check if the passed Date object is valid
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);

  const formattedTime = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);

  return `${formattedDate} · ${formattedTime}`;
}


export function formatToAppTime(startsAt: number, endsAt: number): string {
  const startTime = toMeridiem(startsAt);
  const endTime = toMeridiem(endsAt);

  return `${startTime} - ${endTime}`;
}
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const APP_TIMEZONE = "America/Chihuahua";
dayjs.tz.setDefault(APP_TIMEZONE);

export const toAppTime = (value: Date | string) => {
    return dayjs(value).tz(); 
};

export const fromAppTime = (value: Dayjs) => value.toDate();

export const formatAppTimeSplit = (value: Dayjs) => {
  return {
    dateString: value.format("MMM DD, YYYY (ddd)").toLowerCase(), 
    timeString: value.format("h:mm A")
  };
};


export function parseTo24H(timeString: string): string {
  const [timePart, modifier] = timeString.split(" ");
  const [hoursStr, minutes] = timePart.split(":") ?? ["0", "0"];
  let hours = hoursStr;

  const isPM = modifier?.toLowerCase() === "pm";
  const isAM = modifier?.toLowerCase() === "am";

  if (isPM && hours !== "12") {
    hours = String(Number(hours) + 12);
  } else if (isAM && hours === "12") {
    hours = "00";
  }

  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}
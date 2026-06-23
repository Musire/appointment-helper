import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

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

export default dayjs;
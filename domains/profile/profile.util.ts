import { AccountStatus, DaySchedule, RawHour } from "./profile.types";


export function toAccountStatus<
  T extends Record<string, boolean>,
  ActiveKey extends keyof T
>(
  data: T,
  activeKey: ActiveKey,
  labels: Record<Exclude<keyof T, ActiveKey>, string>
): AccountStatus {
  const requirementKeys = Object.keys(labels) as Array<Exclude<keyof T, ActiveKey>>;

  return {
    active: data[activeKey],
    requirements: requirementKeys.map((key) => ({
      label: labels[key],
      completed: data[key],
    })),
  };
}

export function toDaySchedule(hours: RawHour[]): DaySchedule[] {
  return hours.map(({ label, isActive, start, end }) => ({
    day: label,
    start: isActive ? start : null,
    end: isActive ? end : null,
  }));
}
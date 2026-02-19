export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function unslugify(value: string) {
  return value
    .replace(/-/g, " ")
}

export function createExcerpt(content: string, max = 299) {
  if (!content) return "";
  return content.length > max
    ? content.slice(0, max) + "…"
    : content;
}

const WEEKDAY_ORDER = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
] as const

export type Weekday = typeof WEEKDAY_ORDER[number]

export function sortByWeekday<T extends { day: Weekday }>(
  rows: T[]
): T[] {
  const weekdayOrderMap = new Map<Weekday, number>(
    WEEKDAY_ORDER.map((day, index) => [day, index])
  )
  return [...rows].sort(
    (a, b) =>
      weekdayOrderMap.get(a.day)! -
      weekdayOrderMap.get(b.day)!
  )
}


export function formatCurrency(
  amount: string | number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  const numericAmount =
    typeof amount === "string" ? Number(amount) : amount;

  if (isNaN(numericAmount)) {
    throw new Error("Invalid amount");
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(numericAmount);
}


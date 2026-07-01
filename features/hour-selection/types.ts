export type Day =
  | 'sun'
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'

export type TimeBlock = {
  id: string
  start: number   // minutes
  end: number   // minutes
  days: Day[]
}

export type Consolidated = Record<Day, [number, number][]>

export type ValidationError = {
  blockErrors: Record<string, string[]>
  dayOverlapErrors: Partial<Record<Day, boolean>>
}

export type ServerError = string | ValidationError
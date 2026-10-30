export type Day =
  | 'sun'
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
  | 'Do'
  | 'Lu'
  | 'Ma'
  | 'Mi'
  | 'Ju'
  | 'Vi'
  | 'Sa'

export type TimeBlock = {
  id: string
  start: number   
  end: number   
  days: Day[]
}


export type Consolidated = Record<Day, [number, number][]>

export type ValidationError = {
  blockErrors: Record<string, string[]>
  dayOverlapErrors: Partial<Record<Day, boolean>>
}

export type ServerError = string | ValidationError
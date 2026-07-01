
export type BusinessDay = {
  id: string;
  day: string;
  start: number | null;
  end: number | null;
};

export type State = BusinessDay[];

export type Action =
  | { type: "update_start"; id: string; value: number }
  | { type: "update_end"; id: string; value: number }
  | { type: "toggle_closed"; id: string };
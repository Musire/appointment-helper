import { Action, State } from "./types";

export function hoursReducer(state: State, action: Action): State {
  switch (action.type) {
    case "update_start":
      return state.map(day =>
        day.id === action.id
          ? { ...day, start: action.value }
          : day
      );

    case "update_end":
      return state.map(day =>
        day.id === action.id
          ? { ...day, end: action.value }
          : day
      );

    case "toggle_closed":
      return state.map(day =>
        day.id === action.id
          ? {
              ...day,
              start: day.start === null ? 540 : null,
              end: day.end === null ? 1020 : null,
            }
          : day
      );

    default:
      return state;
  }
}
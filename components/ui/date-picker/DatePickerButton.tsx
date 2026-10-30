"use client";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { Calendar as CalendarIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

dayjs.extend(isToday);

export type DateRangeValue = {
  from?: string;
  to?: string;
};

type SingleDateProps = {
  mode?: "single";
  selectedDate: string;
  onChange: (value: string) => void;
  numberOfMonths?: number;
};

type RangeDateProps = {
  mode: "range";
  selectedDate: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  numberOfMonths?: number;
};

type Props = SingleDateProps | RangeDateProps;

function toDate(value?: string): Date | undefined {
  if (!value) return undefined;

  const date = dayjs(value);
  return date.isValid() ? date.toDate() : undefined;
}

function formatDate(date: Date): string {
  return dayjs(date).format("YYYY-MM-DD");
}

export default function DatePickerButton(props: Props) {
  const [open, setOpen] = useState(false);
  const [draftRange, setDraftRange] = useState<DateRange>();

  const selectionPhase = useRef<"start" | "end">("start");
  const startDateRef = useRef<Date | undefined>(undefined);

  const isRange = props.mode === "range";

  const label = useMemo(() => {
    if (props.mode === "range") {
      const { from, to } = props.selectedDate;

      if (!from) return "Select dates";

      if (!to) {
        return `${dayjs(from).format("DD/MM/YY")} - Select end`;
      }

      return `${dayjs(from).format("DD/MM/YY")} - ${dayjs(to).format(
        "DD/MM/YY"
      )}`;
    }

    if (!props.selectedDate) return "Select date";

    const date = dayjs(props.selectedDate);

    if (!date.isValid()) return "Select date";
    if (date.isToday()) return "Today";

    return date.format("DD/MM/YY");
  }, [props]);

  function resetRangeSelection() {
    selectionPhase.current = "start";
    startDateRef.current = undefined;
    setDraftRange(undefined);
  }

  function handleOpenChange(nextOpen: boolean) {
    resetRangeSelection();
    setOpen(nextOpen);
  }

  function handleRangeDayClick(clickedDate: Date) {
    if (props.mode !== "range") return;

    // First click: establish the start date.
    if (selectionPhase.current === "start") {
      startDateRef.current = clickedDate;
      selectionPhase.current = "end";

      setDraftRange({
        from: clickedDate,
        to: undefined,
      });

      return;
    }

    // Second click: establish the end date.
    const startDate = startDateRef.current;

    if (!startDate) return;

    // Normalize the range if the second date is earlier.
    const from =
      startDate.getTime() <= clickedDate.getTime()
        ? startDate
        : clickedDate;

    const to =
      startDate.getTime() <= clickedDate.getTime()
        ? clickedDate
        : startDate;

    // Update the visual range.
    setDraftRange({ from, to });

    // Submit the completed range exactly once.
    props.onChange({
      from: formatDate(from),
      to: formatDate(to),
    });

    // Reset and close.
    selectionPhase.current = "start";
    startDateRef.current = undefined;
    setOpen(false);
  }

  function handleSingleSelect(date: Date | undefined) {
    if (props.mode === "range" || !date) return;

    props.onChange(formatDate(date));
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 w-auto">
          <CalendarIcon className="h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0"
        align="start"
        onInteractOutside={(event) => {
          if (isRange && selectionPhase.current === "end") {
            event.preventDefault();
          }
        }}
      >
        {isRange ? (
          <Calendar
            mode="range"
            selected={draftRange}
            onDayClick={handleRangeDayClick}
            numberOfMonths={props.numberOfMonths ?? 1}
          />
        ) : (
          <Calendar
            mode="single"
            selected={toDate(props.selectedDate)}
            onSelect={handleSingleSelect}
            defaultMonth={toDate(props.selectedDate)}
            numberOfMonths={props.numberOfMonths ?? 1}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
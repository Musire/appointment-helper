'use client';

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { Calendar as CalendarIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

dayjs.extend(isToday);

type Props = {
    selectedDate: string;
    onChange: (date: string) => void;
};

export default function DatePickerButton({
    selectedDate,
    onChange,
}: Props) {
    const [open, setOpen] = useState(false);

    const dateObj = useMemo(() => {
        return dayjs(selectedDate);
    }, [selectedDate]);

    const label = useMemo(() => {
        if (dateObj.isToday()) return "Today";
        return dateObj.format("DD/MM/YY");
    }, [dateObj]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 w-28">
                    <CalendarIcon className="h-4 w-4" />
                    {label}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={dateObj.toDate()}
                    onSelect={(date) => {
                        if (!date) return;

                        const normalized = dayjs(date).format("YYYY-MM-DD");
                        onChange(normalized);
                        setOpen(false);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
'use client';
import { generateCurrentWeek } from '@/lib/time';
import { Dayjs } from 'dayjs';
import { useMemo } from 'react';

type DataType = {
    day: string;
    date: Dayjs;
}

type DaySelectorProps = {
    data: DataType;
    selected: boolean;
    onSelect: () => void;
}

function DaySelector ({ data, selected, onSelect }: DaySelectorProps) {
    const { day, date } = data
    const isSelected = selected
        ? "bg-white/60 text-deep"
        : ""

    return (
        <li 
            onClick={onSelect} 
            className="flex flex-col items-center  w-1/7 bg-darker h-full p-2 hover:cursor-pointer"
        >
            <p className="h-1/3 mb-1 centered capitalize">{day}</p>
            <p className={`${isSelected} rounded-full centered size-10 `}>{date.format("D")}</p>
        </li>
    )
}

type WeeklySelectorProps = {
    selectedDate: Dayjs;
    onSelect: (d: Dayjs) => void;
}

export default function WeeklySelector ({ selectedDate, onSelect }: WeeklySelectorProps) {
    const week = useMemo(() => generateCurrentWeek(), [])
    return (
        <ul className=" h-20 w-full flex">
            {week.map((item) => {
                return (
                    <DaySelector 
                        key={item.id}
                        data={item}
                        selected={item.date.isSame(selectedDate, "day")}
                        onSelect={() => onSelect(item.date)}
                    />
                )
            })}
        </ul>
    );
}
'use client';
import dayjs, { Dayjs } from 'dayjs';

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

const testData = [
  { id: 'mon-123', day: 'mon', date: dayjs('2026-02-09') },
  { id: 'tue-123', day: 'tue', date: dayjs('2026-02-10') },
  { id: 'wed-123', day: 'wed', date: dayjs('2026-02-11') },
  { id: 'thu-123', day: 'thu', date: dayjs('2026-02-12') },
  { id: 'fri-123', day: 'fri', date: dayjs('2026-02-13') },
  { id: 'sat-123', day: 'sat', date: dayjs('2026-02-14') },
  { id: 'sun-123', day: 'sun', date: dayjs('2026-02-15') },
]

type WeeklySelectorProps = {
    selectedDate: Dayjs;
    onSelect: (d: Dayjs) => void;
}

export default function WeeklySelector ({ selectedDate, onSelect }: WeeklySelectorProps) {

    return (
        <ul className=" h-20 w-full flex">
            {testData.map((item) => {
                return (
                    <DaySelector 
                        key={item.id}
                        data={item}
                        selected={item.date.toString() === selectedDate.toString()}
                        onSelect={() => onSelect(item.date)}
                    />
                )
            })}
        </ul>
    );
}
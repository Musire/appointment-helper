import { toMeridiem } from "@/lib/utils/timeConversion";
import dayjs from "dayjs";
import { Calendar as Icon } from "lucide-react";

type DatetimeSlotProps = {
    datetime: {
        date: string;
        time: number;
    }
}

export default function DatetimeCard ({ datetime }: DatetimeSlotProps) {
    const date = dayjs(datetime.date)
    return (
        <li className="flex items-center space-x-6 w-full">
            <Icon size={30} strokeWidth={1} />
            <span className="flex flex-col">
                <p className="">{date.format('dddd, MMMM D, YYYY')}</p>
                <p className="">{toMeridiem(datetime.time * 60)}</p>
            </span>
        </li>
    );
}
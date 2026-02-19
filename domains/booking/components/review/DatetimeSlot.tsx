import { getMeridiem } from "@/lib/time";
import dayjs from "dayjs";
import { Calendar as Icon } from "lucide-react";

type DatetimeSlotProps = {
    datetime: {
        date: string;
        time: string;
    }
}

export default function DatetimeSlot ({ datetime }: DatetimeSlotProps) {
    const date = dayjs(datetime.date)
    return (
        <li className="flex items-center space-x-6 w-72">
            <Icon size={30} strokeWidth={1} />
            <span className="flex flex-col">
                <p className="">{date.format('dddd, MMMM D, YYYY')}</p>
                <p className="">{getMeridiem(datetime.time)}</p>
            </span>
        </li>
    );
}
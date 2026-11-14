import { formatIsoDate, toMeridiem } from "@/lib/utils/timeConversion";
import { Calendar as Icon } from "lucide-react";

type DatetimeSlotProps = {
    date: string;
    time: number;
}

export default function DatetimeSlot ({ date, time }: DatetimeSlotProps) {
    return (
        <li className="flex items-center space-x-6 w-full">
            <Icon size={30} strokeWidth={1} />
            <span className="spaced w-full ">
                <p className="">{formatIsoDate(date)}</p>
                <p className="">{toMeridiem(time * 60)}</p>
            </span>
        </li>
    );
}
import { Body, Caption } from "@/components/UI";
import { Dayjs } from "dayjs";
import { Info } from "lucide-react";
import { AppointmentStatus } from "./StatusSection";
import dayjs from "@/domains/appointments/helper/dayjs"

type Props = {
    status: AppointmentStatus;
    dateTime?: Dayjs; 
};

const STATUS_CONFIG = {
    pending: { 
        bgClass: "bg-success", 
        textClass: "text-success", 
        state: "Ready", 
        msg: "checked-in" 
    },
    checkedin: { 
        bgClass: "bg-purple-600", 
        textClass: "text-purple-400", 
        state: "Checked In", 
        msg: "already been checked-in" 
    },
    inprogress: { 
        bgClass: "bg-purple-600", 
        textClass: "text-purple-400", 
        state: "Checked In", 
        msg: "already been checked-in" 
    },
    completed: { 
        bgClass: "bg-blue-500", 
        textClass: "text-blue-400", 
        state: "Completed", 
        msg: "already been completed" 
    },
    noshow: { 
        bgClass: "bg-orange-800", 
        textClass: "text-orange-700 dark:text-orange-400", 
        state: "No Show", 
        msg: "marked as a no-show" 
    },
    cancelled: { 
        bgClass: "bg-error", 
        textClass: "text-error", 
        state: "Cancelled", 
        msg: "cancelled" 
    },
    offset: { 
        bgClass: "", 
        textClass: "text-slate-400", 
        state: "Locked", 
        msg: "Check in window" 
    },
} as const;


export default function Message({
    status,
    dateTime = dayjs() // Defaults to now if not provided
}: Props) {
    const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];

    if (!config || status === 'pending') return null; 

    const { textClass, msg } = config;

    // Format the date (e.g., "May 24, 2024")
    const formattedDate = dateTime.format("MMM DD, YYYY");

    // Format the time (e.g., "3:45 PM")
    const formattedTime = dateTime.format("h:mm A");    

    return (
        <div className="p-4 grid-cols-[15%_1fr] grid-rows-1 grid surface-1 rounded-md">
            <Info className={`${textClass}`} />
            <Body className="">
                {msg} on{" "}
                <Caption className={`text-base ${textClass}`}>{formattedDate}</Caption> @{" "}
                <Caption className={`text-base ${textClass}`}>{formattedTime}.</Caption>
            </Body>
        </div>
    );
}

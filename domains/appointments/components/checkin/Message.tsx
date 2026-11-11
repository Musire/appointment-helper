import { Body, Caption } from "@/components/ui";
import dayjs from "@/domains/appointments/utils/dayjs";
import { AppointmentStatus } from "@/generated/prisma";
import { Dayjs } from "dayjs";
import { Info } from "lucide-react";

type Props = {
    status: AppointmentStatus | "OFFSET";
    dateTime?: Dayjs; 
};

const STATUS_CONFIG = {
    PENDING: { 
        bgClass: "bg-success", 
        textClass: "text-success", 
        state: "Ready", 
        msg: "checked-in" 
    },
    CHECKIN: { 
        bgClass: "bg-purple-600", 
        textClass: "text-purple-400", 
        state: "Checked In", 
        msg: "already been checked-in" 
    },
    INPROGRESS: { 
        bgClass: "bg-purple-600", 
        textClass: "text-purple-400", 
        state: "Checked In", 
        msg: "already been checked-in" 
    },
    COMPLETED: { 
        bgClass: "bg-blue-500", 
        textClass: "text-blue-400", 
        state: "Completed", 
        msg: "already been completed" 
    },
    NOSHOW: { 
        bgClass: "bg-orange-800", 
        textClass: "text-orange-700 dark:text-orange-400", 
        state: "No Show", 
        msg: "marked as a no-show" 
    },
    CANCELLED: { 
        bgClass: "bg-error", 
        textClass: "text-error", 
        state: "Cancelled", 
        msg: "cancelled" 
    },
    OFFSET: { 
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

    if (!config || status === 'PENDING') return null; 

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

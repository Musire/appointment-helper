import { Body, Caption, H3 } from "@/components/ui";
import { AppointmentStatus } from "@/generated/prisma";
import { AlertTriangle, Check, Copy, OctagonAlert, X } from "lucide-react";

type Props = {
    status: AppointmentStatus | "OFFSET";
};

const STATUS_CONFIG = {
    PENDING: { 
        Icon: Check, 
        bgClass: "bg-success", 
        textClass: "text-success", 
        state: "Ready", 
        msg: "ready for check-in" 
    },
    CHECKIN: { 
        Icon: Copy, 
        bgClass: "bg-purple-600", 
        textClass: "text-purple-400", 
        state: "Duplicate", 
        msg: "already been checked-in" 
    },
    INPROGRESS: { 
        Icon: Copy, 
        bgClass: "bg-purple-600", 
        textClass: "text-purple-400", 
        state: "Checked In", 
        msg: "already been checked-in" 
    },
    COMPLETED: { 
        Icon: OctagonAlert , 
        bgClass: "bg-blue-500", 
        textClass: "text-blue-400", 
        state: "Completed", 
        msg: "already been completed" 
    },
    NOSHOW: { 
        Icon: X, 
        bgClass: "bg-orange-400/60", 
        textClass: "text-orange-400", 
        state: "No Show", 
        msg: "marked as a no-show" 
    },
    CANCELLED: { 
        Icon: X, 
        bgClass: "bg-error border", 
        textClass: "text-error", 
        state: "Cancelled", 
        msg: "cancelled" 
    },
    OFFSET: { 
        Icon: AlertTriangle, 
        bgClass: "bg-slate-700", 
        textClass: "text-slate-400", 
        state: "Unavailable", 
        msg: "attempted outside of checkin-window" 
    },
} as const;

export default function StatusSection({ status }: Props) {
    const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];

    if (!config) return null; 

    const { Icon, bgClass, textClass, state, msg } = config;

    return (
        <div className="centered-col space-y-1">
            {/* The full bgClass is now correctly injected and compiled */}
            <div className={`size-32 rounded-full text-background centered ${bgClass}`}>
                <Icon size={50} />
            </div>
            <H3>Check-in {state}</H3>
            <Body>
                This appointment has been{" "}
                <Caption className={`text-base ${textClass}`}>
                    {msg}
                </Caption>
            </Body>
        </div>
    );
}

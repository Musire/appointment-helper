import { Caption } from "@/components/UI";
import { Button } from "@/components/ui/button";
import { CalendarX, ChevronRight } from "lucide-react";

type Props = {
    appointmentId: string;
}

export default function CheckinButton ({ appointmentId }: Props) {
    return (
        <Button variant="secondary" className="h-16 space-x-2 border-none text-main  justify-start bg-surface-1 hover:bg-error/20 active:bg-error/30">
            <span className="centered p-2 bg-error/20 rounded-md">
                <CalendarX strokeWidth={1} size={60} className="shrink-0 size-8" />
            </span>
            <Caption className="text-xl">Cancel Appointment</Caption>
            <ChevronRight className="ml-auto size-8" />
        </Button>
    );
}
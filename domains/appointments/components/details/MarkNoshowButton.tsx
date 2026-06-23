import { Caption } from "@/components/UI";
import { Button } from "@/components/ui/button";
import { ChevronRight, UserX } from "lucide-react";

type Props = {
    appointmentId: string;
}

export default function CheckinButton ({ appointmentId }: Props) {
    return (
        <Button variant="secondary" className="h-16 space-x-2 text-main  hover:bg-surface-1 justify-start">
            <UserX strokeWidth={1} size={60} className="shrink-0 size-8" />
            <Caption className="text-xl">Mark No-Show</Caption>
            <ChevronRight className="ml-auto size-8" />
        </Button>
    );
}
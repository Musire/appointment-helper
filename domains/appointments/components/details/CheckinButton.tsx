'use client'

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCheck, ChevronRight, Loader2 } from "lucide-react";
import { Caption } from "@/components/UI";
import { Button } from "@/components/ui/button";
import { checkInAppointment } from "../../actions/appointment-action";

type Props = {
    appointmentId: string;
}

export default function CheckinButton ({ appointmentId }: Props) {
    const router = useRouter();
    
    // isPending tracks the active execution of the action
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        // Wrap the execution inside startTransition
        startTransition(async () => {
            const response = await checkInAppointment(appointmentId);

            if (response.success) {
                // Only redirect if the server database modification succeeded
                router.push('/staff/dashboard/checkin/success');
            } else {
                // Handle your error contract (e.g., alert, toast notification)
                alert(response.error); 
            }
        });
    };

    return (
        <Button 
            variant="secondary" 
            onClick={handleClick}
            disabled={isPending} // Disable interaction while loading
            className="h-16 space-x-2 text-on-error bg-success/80 hover:bg-success/90 justify-start border-none disabled:opacity-50"
        >
            {isPending ? (
                // Show a loading spinner when processing
                <Loader2 className="shrink-0 size-8 animate-spin" />
            ) : (
                <CheckCheck strokeWidth={1} size={60} className="shrink-0 size-8" />
            )}
            
            <Caption className="text-xl">
                {isPending ? "Checking in..." : "Go to Checkin"}
            </Caption>
            
            <ChevronRight className="ml-auto size-8" />
        </Button>
    );
}

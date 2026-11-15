'use client';

import { cancelAppointment } from "@/domains/appointments/appointment.actions";

type Props = {
  appointmentId: string
}

export default function CancelledButton ({ appointmentId }: Props) {
    const handleClick = (appointmentId: string) => {
        cancelAppointment({ appointmentId })
        console.log(appointmentId)
    }
    return (
        <button 
            onClick={() => handleClick(appointmentId)}
            type="button" 
            className="w-full bg-error/20 h-16 border border-error text-error normal-space rounded-lg cursor-pointer"
        >
            Test Cancel
        </button>
    );
}
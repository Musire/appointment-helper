'use client';

import { checkinAppointment, markNoshow } from "@/domains/appointments/appointment.actions";

type Props = {
  appointmentId: string
}

export default function NoshowButton ({ appointmentId }: Props) {
    const handleClick = (appointmentId: string) => {
        markNoshow({ appointmentId })
        console.log(appointmentId)
    }
    return (
        <button 
            onClick={() => handleClick(appointmentId)}
            type="button" 
            className="w-full bg-error/20 h-16 border border-error text-error normal-space rounded-lg cursor-pointer"
        >
            Test No-show
        </button>
    );
}
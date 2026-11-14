'use client';

import { startService } from "@/domains/appointments/appointment.actions";

type Props = {
  appointmentId: string
}

export default function StartServiceButton ({ appointmentId }: Props) {
    const handleClick = (appointmentId: string) => {
        startService({ appointmentId })
        console.log(appointmentId)
    }
    return (
        <button 
            onClick={() => handleClick(appointmentId)}
            type="button" 
            className="w-full bg-success/20 border border-success text-success normal-space rounded-lg cursor-pointer"
        >
            Test Start Service
        </button>
    );
}
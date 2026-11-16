'use client';

import { checkinAppointment } from "@/domains/appointments/appointment.actions";

type Props = {
  appointmentId: string
}

export default function CheckinButton ({ appointmentId }: Props) {
    const handleClick = (appointmentId: string) => {
        checkinAppointment({ appointmentId })
        console.log(appointmentId)
    }
    return (
        <button 
            onClick={() => handleClick(appointmentId)}
            type="button" 
            className="w-full bg-success/20 border border-success text-success normal-space rounded-lg cursor-pointer"
        >
            Test Checkin
        </button>
    );
}
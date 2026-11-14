'use client';

import { startTransition, useTransition } from 'react';
import { useServiceTimer } from '../../useServiceTimer';

import BreaksList from './inprogress/BreaksList';
import CompleteServiceButton from './inprogress/CompleteServiceButton';
import CurrentService from './inprogress/CurrentService';
import CustomerNotes from './inprogress/CustomerNotes';
import { completeAppointment } from '@/domains/appointments/appointment.actions';
import { useToast } from '@/context/ToastContext';
import { AppointmentDetails } from '@/domains/appointments/appointment.types';

type Props = {
  appointment: AppointmentDetails
}

export default function StaffInprogress({ appointment }: Props) {
  const { createSuccess, createError } = useToast()
  const [pending, startTransition] = useTransition()
  const {
    isRunning,
    isOnBreak,
    serviceStartedAt,
    elapsed,
    breaks,
    now,
    pauseTimer,
    resumeTimer,
  } = useServiceTimer();

  const handleCompletion = () => {
    startTransition(async() =>{
      const res = await completeAppointment({
        appointmentId: appointment.id
      })
      
      if (!res.success && res.error) {
        createError(res.error)
        return;
      }
      createSuccess("service completed")

    })
    
  }

  return (
    <div className="flex-1 p-6 relative stacked overflow-y-auto scrollbar-none">
      <h3 className="mx-auto text-xl">In Progress</h3>

      <CurrentService
        serviceStartedAt={serviceStartedAt}
        isRunning={isRunning}
        isOnBreak={isOnBreak}
        elapsed={elapsed}
        onPause={pauseTimer}
        onResume={resumeTimer}
      />

      <CustomerNotes />

      <BreaksList breaks={breaks} now={now} />

      <CompleteServiceButton
        disabled={!serviceStartedAt || !isRunning || pending}
        onComplete={handleCompletion}
      />
    </div>
  );
}

'use client';

import dayjs from 'dayjs';
import { useState, useTransition } from 'react';

import { getAppointmentPool } from '../appointments/appointment.queries';
import type { ExtendedUserAppointment } from '../appointments/appointment.types';

export type OptionType =
  | 'all'
  | 'checkedin'
  | 'pending'
  | 'cancelled'
  | 'noshow'
  | 'inprogress'
  | 'completed';

const options: OptionType[] = [
  'all',
  'checkedin',
  'pending',
  'cancelled',
  'noshow',
  'inprogress',
  'completed',
];

type Props = {
  appointments: ExtendedUserAppointment[];
};

export default function usePoolFilters({
  appointments: initialAppointments,
}: Props) {
  const [appointments, setAppointments] =
    useState<ExtendedUserAppointment[]>(initialAppointments);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD')
  );

  const [selected, setSelected] = useState<OptionType[]>(['all']);

  const [pending, startTransition] = useTransition();

  const handleDateSelect = (date: string) => {
    if (!date || date === selectedDate) return;

    setSelectedDate(date);

    startTransition(async () => {
      const selectedDay = new Date(`${date}T00:00:00`);

      const from = new Date(selectedDay);
      from.setHours(0, 0, 0, 0);

      const to = new Date(selectedDay);
      to.setHours(23, 59, 59, 999);

      const payload = {
        from: from.toISOString(),
        to: to.toISOString(),
      };

      const { data: appointments } = await getAppointmentPool(payload);

      setAppointments(appointments ?? []);
    });
  };

  const handleSelect = (value: OptionType) => {
    setSelected((prev) => {
      if (value === 'all') return ['all'];

      const filters = prev.filter((item) => item !== 'all');

      if (filters.includes(value)) {
        return filters.filter((item) => item !== value);
      }

      return [...filters, value];
    });
  };

  const filteredAppointments = appointments.filter((appointment) => {
    return (
      selected.includes('all') ||
      selected.includes(
        appointment.status.toLowerCase() as OptionType
      )
    );
  });

  return {
    options,
    selected,
    selectedDate,
    handleSelect,
    handleDateSelect,
    filteredAppointments,
    loading: pending
  };
}

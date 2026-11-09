'use client';

import { ExtendedUserAppointment } from '@/features/history/components/staff/cards/AppointmentCard';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

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

export default function usePoolFilters({ appointments }: Props) {
  const [selected, setSelected] = useState<OptionType[]>(['all']);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD')
  );

  const handleSelect = (value: OptionType) => {
    setSelected((prev) => {
      if (prev.includes('all')) {
        if (value === 'all') {
          return [];
        }

        return [value];
      }

      if (value === 'all') {
        return ['all'];
      }

      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }

      return [...prev, value];
    });
  };

  const handleDateSelect = (date: string) => {
    if (!date) return;

    setSelectedDate(date);
  };

  const filteredAppointments = useMemo(() => {
    if (!selected.length) {
      return [];
    }

    return appointments.filter((appointment) => {
      const matchesStatus =
        selected.includes('all') ||
        selected.includes(appointment.status.toLowerCase() as OptionType);

      const matchesDate =
        dayjs(appointment.date).format('YYYY-MM-DD') === selectedDate;

      return matchesStatus && matchesDate;
    });
  }, [appointments, selected, selectedDate]);

  return {
    options,
    selected,
    selectedDate,
    handleSelect,
    handleDateSelect,
    filteredAppointments,
  };
}
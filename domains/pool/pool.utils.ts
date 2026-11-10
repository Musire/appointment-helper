'use server';

import { getAppointmentPool } from '../appointments/appointment.queries';

export async function getAppointmentPoolByDate(date: string) {
  const selectedDate = new Date(date);

  const from = new Date(selectedDate);
  from.setHours(0, 0, 0, 0);

  const to = new Date(selectedDate);
  to.setHours(23, 59, 59, 999);

  const { data } = await getAppointmentPool({
    from: from.toISOString(),
    to: to.toISOString(),
  });

  return data ?? [];
}
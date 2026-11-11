import { AppointmentMetrics, ExtendedUserAppointment } from "./appointment.types";


export function getAppointmentMetrics(appointments: ExtendedUserAppointment[]): AppointmentMetrics {
  return appointments.reduce<AppointmentMetrics>(
    (acc, current) => {
      if (current.status === "PENDING") acc.pending++;
      if (current.status === "CHECKIN" || current.status === "INPROGRESS") {
        acc.checkedIn++;
      }
      if (current.status === "COMPLETED") acc.completed++;
      return acc;
    },
    { pending: 0, checkedIn: 0, completed: 0 }
  );
}
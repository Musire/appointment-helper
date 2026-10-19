// src/domain/appointments/services/appointment-service.ts
import { AppointmentStatus } from "@/generated/prisma";
import { AppointmentRepository } from "./appointment.repositories";

export async function processAppointmentCheckin(appointmentId: string): Promise<void> {
  const appointment = await AppointmentRepository.findAppointmentById(appointmentId);
  if (!appointment) throw new Error("Appointment not found");

  // 1. Guard against statuses that are already checked in
  if (appointment.status === AppointmentStatus.CHECKIN) {
    throw new Error("Customer is already checked in");
  }

  // 2. Guard against all other invalid lifecycle statuses
  const invalidStatuses: AppointmentStatus[] = [
    AppointmentStatus.COMPLETED,
    AppointmentStatus.INPROGRESS,
    AppointmentStatus.CANCELLED,
    AppointmentStatus.NOSHOW
  ];

  if (invalidStatuses.includes(appointment.status)) {
    throw new Error(`Cannot check-in an appointment that is ${appointment.status.toLowerCase()}`);
  }

  // 3. Complete mutation if status is valid (e.g., PENDING)
  await AppointmentRepository.updateAppointmentStatus(appointmentId, AppointmentStatus.CHECKIN);
}

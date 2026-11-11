// src/domain/appointments/services/appointment-service.ts
import { AppointmentStatus } from "@/generated/prisma";
import { getCurrentUser } from "../auth/util/session";
import { AppointmentRepository } from "./appointment.repositories";
import { AppointmentDetailType, HistoryType, PoolType } from "./appointment.validations";

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

export async function getHistoryService (data: HistoryType) {
  return AppointmentRepository.getHistory(data)
}

export async function getPoolService (data: PoolType) {
  const user = await getCurrentUser()

  if (!user) throw new Error('no user found')

  let payload

  if (user.role === "STAFF") {
    payload = { ...data, staffId: user.id };
  } else if (user.role === "USER") {
    payload = { ...data, userId: user.id };
  } else {
    throw new Error("Unauthorized role");
  }

  console.log(data)

  return AppointmentRepository.getPool(payload)
}

export async function getAppointmentService (data: AppointmentDetailType) {
  return AppointmentRepository.getAppointmentDetails(data)
}
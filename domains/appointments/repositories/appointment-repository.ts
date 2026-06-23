import { AppointmentStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function findAppointmentById(id: string) {
  return await prisma.appointment.findUnique({ where: { id } });
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  return await prisma.appointment.update({
    where: { id },
    data: { status, checkedInAt: new Date() },
  });
}

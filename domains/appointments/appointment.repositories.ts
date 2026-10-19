import { AppointmentStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";


export const AppointmentRepository = {
  async findAppointmentById(id: string) {
    return await prisma.appointment.findUnique({ where: { id } });
  },
  async updateAppointmentStatus(id: string, status: AppointmentStatus) {
    return prisma.appointment.update({
      where: { id },
      data: { status, checkedInAt: new Date() },
    });
  }
}
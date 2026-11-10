import { AppointmentStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { HistoryType, PoolType } from "./appointment.validations";


export const AppointmentRepository = {
  async findAppointmentById(id: string) {
    return await prisma.appointment.findUnique({ where: { id } });
  },
  async updateAppointmentStatus(id: string, status: AppointmentStatus) {
    return prisma.appointment.update({
      where: { id },
      data: { status, checkedInAt: new Date() },
    });
  },
  async getStaffAppointmentsByDate(data: {staffId: string, date: Date}) {
    const appointments = await prisma.appointment.findMany({
      where: data
    })
    return appointments
  },
  async getHistory({ from, to, userId, staffId }: HistoryType) {
    const history = prisma.appointment.findMany({
      where: {
        date: {
          gte: from,
          lte: to,
        },
        ...(userId && { userId }),
        ...(staffId && { staffId }),
        status: {
          in: ["COMPLETED", "CANCELLED", "NOSHOW"],
        },
      },
      orderBy: [
        { date: "desc" },
        { startTime: "desc" },
      ],
    });
    return history
  },

  async getPool({ from, to, userId, staffId }: PoolType) {
    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: from,
          lte: to,
        },
        ...(userId && { userId }),
        ...(staffId && {
          staff: {
            userId: staffId,
          },
        }),
        status: {
          in: ["PENDING", "CHECKIN", "INPROGRESS"],
        },
      },
      include: {
        client: {
          select: {
            fullName: true,
          },
        },
        items: {
          include: {
            service: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: [
        { date: "asc" },
        { startTime: "asc" },
      ],
    });
    const pool = appointments.map((appointment) => ({
      ...appointment,
      items: appointment.items.map((item) => item.service.name),
    }));

    return pool;
  },
  
}
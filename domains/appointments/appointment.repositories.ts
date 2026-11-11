import { AppointmentStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { AppointmentDetails } from "./appointment.types";
import { AppointmentDetailType, HistoryType, PoolType } from "./appointment.validations";


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
          in: ["COMPLETED", "CANCELLED", "NOSHOW"],
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
    const history = appointments.map((appointment) => ({
      ...appointment,
      items: appointment.items.map((item) => item.service.name),
    }));
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
  async getAppointmentDetails ({ id }: AppointmentDetailType) {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        client: true,
        store: true,
        items: {
          include: {
            service: true,
          },
        },
      },
    });

    if (!appointment) return null;

    const details: AppointmentDetails = {
      id: appointment.id,
      client: {
        id: appointment.client.id,
        name: appointment.client.fullName ?? 'client name'
      },
      barberId: appointment.staffId,
      store: appointment.store,
      scheduledAt: appointment.date,
      createdAt: appointment.createdAt,
      checkedAt: appointment.checkedInAt,
      status: appointment.status,
      services: appointment.items.map((item) => item.service),
    };

    return details;
  },
  async getFutureUserAppointments(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
        date: {
          gte: today,
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

    const futureAppointments = appointments.map((appointment) => ({
      ...appointment,
      items: appointment.items.map((item) => item.service.name),
    }));

    return futureAppointments;
  }
  
}
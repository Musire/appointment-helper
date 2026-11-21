import { AppointmentStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { AppointmentDetails } from "./appointment.types";
import { appointmentCompletionType, AppointmentDetailType, HistoryType, PoolType } from "./appointment.validations";


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
                lt: to,
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
                    id: true,
                    fullName: true,
                    email: true,
                    phone: true,
                },
            },
            store: true,
            staff: {
                select: {
                    id: true,
                },
            },
            items: {
                include: {
                    service: true,
                },
            },
            breaks: true,
        },
        orderBy: [
            { date: "asc" },
            { startTime: "asc" },
        ],
    });

    const history = appointments.map(({ items, ...appointment }) => ({
        ...appointment,
        services: items.map(item => item.service),
    }));
    return history
  },
  async getPool({ from, to, userId, staffId }: PoolType) {
    const appointments = await prisma.appointment.findMany({
        where: {
            date: {
                gte: from,
                lt: to,
            },
            ...(userId && { userId }),
            ...(staffId && {
                staff: {
                    userId: staffId,
                },
            }),
            status: {
                in: ["PENDING", "INPROGRESS", "CHECKIN"],
            },
        },
        include: {
            client: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phone: true,
                },
            },
            store: true,
            staff: {
                select: {
                    id: true,
                },
            },
            items: {
                include: {
                    service: true,
                },
            },
            breaks: true,
        },
        orderBy: [
            { date: "asc" },
            { startTime: "asc" },
        ],
    });
    const pool = appointments.map((appointment) => ({
        ...appointment,
        services: appointment.items.map((item) => item.service),
    }));

    return pool;
  },
  async getAppointmentDetails({ id }: AppointmentDetailType) {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        client: true,
        staff: {
          include: {
            user: true,
          },
        },
        store: true,
        items: {
          include: {
            service: true,
          },
        },
        breaks: true,
      },
    });

    if (!appointment) return null;

    const { items, breaks, ...appointmentData } = appointment;

    const details: AppointmentDetails = {
      ...appointmentData,

      client: {
        id: appointment.client.id,
        fullName: appointment.client.fullName,
        email: appointment.client.email,
        phone: appointment.client.phone,
      },

      staff: {
        id: appointment.staff.id,
      },

      store: appointment.store,

      services: items.map((item) => item.service),

      breaks: breaks.map((item) => ({
        id: item.id,
        startsAt: item.startsAt,
        endsAt: item.endsAt,
      })),
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
            status: {
              in: ['PENDING', 'INPROGRESS', 'CHECKIN']
            }
        },
        include: {
            client: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phone: true,
                },
            },
            store: true,
            staff: {
                select: {
                    id: true,
                },
            },
            items: {
                include: {
                    service: true,
                },
            },
            breaks: true,
        },
        orderBy: [
            { date: "asc" },
            { startTime: "asc" },
        ],
    });

    const futureAppointments = appointments.map(({ items, ...appointment }) => ({
        ...appointment,
        services: items.map((item) => item.service),
    }));

    return futureAppointments;
  },
  async checkinAppointment (id: string) {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        status: 'CHECKIN'
      }
    })
    return appointment
  },
  async startService (id: string) {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        status: 'INPROGRESS',
        startedAt: new Date()
      }
    })
    return appointment
  },
  async completeService(data: appointmentCompletionType) {

    const appointment = await prisma.appointment.update({
      where: { id: data.appointmentId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    return appointment;
  },
  async markNoshow(id: string) {
    const appointment = await prisma.appointment.update({
      where: {id},
      data: {
        status: "NOSHOW",
        noshowAt: new Date(),
      }
    })
    return appointment
  },
  async cancelAppointment(id: string) {
    const appointment = await prisma.appointment.update({
      where: {id},
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
      }
    })
    return appointment
  },
  
}
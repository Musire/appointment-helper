import {
  Appointment,
  AppointmentService,
  AppointmentStatus,
  Service,
  User,
} from '@/generated/prisma';
import dayjs from 'dayjs';

export type AppointmentWithRelations = Appointment & {
  client: User;
  items: (AppointmentService & {
    service: Service;
  })[];
};

const weekStart = dayjs().startOf('week').add(1, 'day');

const weekDate = (day: number, hour: number, minute = 0) =>
  weekStart.add(day, 'day').hour(hour).minute(minute).second(0).millisecond(0).toDate();

const createdDate = () => dayjs().toDate();


export const mockAppointments: AppointmentWithRelations[] = [
  {
    id: 'apt-1',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-1',

    startTime: weekDate(0, 9),
    endTime: weekDate(0, 10),

    status: AppointmentStatus.PENDING,
    createdAt: createdDate(),
    checkedInAt: null,

    client: {
      id: 'user-1',
      email: 'maria@example.com',
      fullName: 'Maria Garcia',
      phone: '555-1111',
      avatarUrl: null,
      createdAt: createdDate(),
    },

    items: [
      {
        id: 'item-1',
        appointmentId: 'apt-1',
        serviceId: 'svc-1',
        service: {
          id: 'svc-1',
          storeId: 'store-1',
          name: 'Haircut',
          price: 2500,
          createdAt: createdDate(),
        },
      },
      {
        id: 'item-2',
        appointmentId: 'apt-1',
        serviceId: 'svc-2',
        service: {
          id: 'svc-2',
          storeId: 'store-1',
          name: 'Wash',
          price: 1000,
          createdAt: createdDate(),
        },
      },
    ],
  },

  {
    id: 'apt-2',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-2',

    startTime: weekDate(0, 10),
    endTime: weekDate(0, 11),

    status: AppointmentStatus.PENDING,
    createdAt: createdDate(),
    checkedInAt: null,

    client: {
      id: 'user-2',
      email: 'juan@example.com',
      fullName: 'Juan Martinez',
      phone: '555-1112',
      avatarUrl: null,
      createdAt: createdDate(),
    },

    items: [
      {
        id: 'item-3',
        appointmentId: 'apt-2',
        serviceId: 'svc-3',
        service: {
          id: 'svc-3',
          storeId: 'store-1',
          name: 'Haircut',
          price: 2500,
          createdAt: createdDate(),
        },
      },
      {
        id: 'item-4',
        appointmentId: 'apt-2',
        serviceId: 'svc-4',
        service: {
          id: 'svc-4',
          storeId: 'store-1',
          name: 'Beard Trim',
          price: 1200,
          createdAt: createdDate(),
        },
      },
      {
        id: 'item-5',
        appointmentId: 'apt-2',
        serviceId: 'svc-5',
        service: {
          id: 'svc-5',
          storeId: 'store-1',
          name: 'Wash',
          price: 1000,
          createdAt: createdDate(),
        },
      },
    ],
  },

  {
    id: 'apt-3',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-3',

    startTime: weekDate(0, 11),
    endTime: weekDate(0, 12),

    status: AppointmentStatus.PENDING,
    createdAt: createdDate(),
    checkedInAt: null,

    client: {
      id: 'user-3',
      email: 'ana@example.com',
      fullName: 'Ana Lopez',
      phone: '555-1113',
      avatarUrl: null,
      createdAt: createdDate(),
    },

    items: [
      {
        id: 'item-6',
        appointmentId: 'apt-3',
        serviceId: 'svc-6',
        service: {
          id: 'svc-6',
          storeId: 'store-1',
          name: 'Hair Color',
          price: 5000,
          createdAt: createdDate(),
        },
      },
    ],
  },

  {
    id: 'apt-4',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-4',

    startTime: weekDate(0, 12),
    endTime: weekDate(0, 13),

    status: AppointmentStatus.PENDING,
    createdAt: createdDate(),
    checkedInAt: null,

    client: {
      id: 'user-4',
      email: 'carlos@example.com',
      fullName: 'Carlos Ruiz',
      phone: '555-1114',
      avatarUrl: null,
      createdAt: createdDate(),
    },

    items: [
      {
        id: 'item-7',
        appointmentId: 'apt-4',
        serviceId: 'svc-7',
        service: {
          id: 'svc-7',
          storeId: 'store-1',
          name: 'Styling',
          price: 3500,
          createdAt: createdDate(),
        },
      },
    ],
  },

  {
    id: 'apt-5',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-5',

    startTime: weekDate(0, 13),
    endTime: weekDate(0, 14),

    status: AppointmentStatus.CANCELLED,
    createdAt: createdDate(),
    checkedInAt: null,

    client: {
      id: 'user-5',
      email: 'sofia@example.com',
      fullName: 'Sofia Hernandez',
      phone: '555-1115',
      avatarUrl: null,
      createdAt: createdDate(),
    },

    items: [
      {
        id: 'item-8',
        appointmentId: 'apt-5',
        serviceId: 'svc-8',
        service: {
          id: 'svc-8',
          storeId: 'store-1',
          name: 'Haircut',
          price: 3000,
          createdAt: createdDate(),
        },
      },
    ],
  },

  {
    id: 'apt-6',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-6',

    startTime: weekDate(0, 14),
    endTime: weekDate(0, 15),

    status: AppointmentStatus.PENDING,
    createdAt: createdDate(),
    checkedInAt: null,

    client: {
      id: 'user-6',
      email: 'miguel@example.com',
      fullName: 'Miguel Torres',
      phone: '555-1116',
      avatarUrl: null,
      createdAt: createdDate(),
    },

    items: [
      {
        id: 'item-9',
        appointmentId: 'apt-6',
        serviceId: 'svc-9',
        service: {
          id: 'svc-9',
          storeId: 'store-1',
          name: 'Hair Color',
          price: 5000,
          createdAt: createdDate(),
        },
      },
    ],
  },

  {
    id: 'apt-7',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-7',

    startTime: weekDate(0, 15),
    endTime: weekDate(0, 16),

    status: AppointmentStatus.PENDING,
    createdAt: createdDate(),
    checkedInAt: null,

    client: {
      id: 'user-7',
      email: 'laura@example.com',
      fullName: 'Laura Mendoza',
      phone: '555-1117',
      avatarUrl: null,
      createdAt: createdDate(),
    },

    items: [
      {
        id: 'item-10',
        appointmentId: 'apt-7',
        serviceId: 'svc-10',
        service: {
          id: 'svc-10',
          storeId: 'store-1',
          name: 'Styling',
          price: 3500,
          createdAt: createdDate(),
        },
      },
    ],
  },

  {
    id: 'apt-8',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-8',

    startTime: weekDate(0, 16),
    endTime: weekDate(0, 17),

    status: AppointmentStatus.PENDING,
    createdAt: createdDate(),
    checkedInAt: null,

    client: {
      id: 'user-8',
      email: 'pedro@example.com',
      fullName: 'Pedro Sanchez',
      phone: '555-1118',
      avatarUrl: null,
      createdAt: createdDate(),
    },

    items: [
      {
        id: 'item-11',
        appointmentId: 'apt-8',
        serviceId: 'svc-11',
        service: {
          id: 'svc-11',
          storeId: 'store-1',
          name: 'Haircut',
          price: 3000,
          createdAt: createdDate(),
        },
      },
    ],
  },

  {
    id: 'apt-9',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-9',

    startTime: weekDate(0, 17),
    endTime: weekDate(0, 18),

    status: AppointmentStatus.PENDING,
    createdAt: createdDate(),
    checkedInAt: null,

    client: {
      id: 'user-9',
      email: 'elena@example.com',
      fullName: 'Elena Gomez',
      phone: '555-1119',
      avatarUrl: null,
      createdAt: createdDate(),
    },

    items: [
      {
        id: 'item-12',
        appointmentId: 'apt-9',
        serviceId: 'svc-12',
        service: {
          id: 'svc-12',
          storeId: 'store-1',
          name: 'Wash',
          price: 1000,
          createdAt: createdDate(),
        },
      },
    ],
  },
];
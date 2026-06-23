import {
  Appointment,
  AppointmentService,
  AppointmentStatus,
  Service,
  ServiceType,
  User,
} from '@/generated/prisma';

export type AppointmentWithRelations = Appointment & {
  client: User;
  items: (AppointmentService & {
    service: Service;
  })[];
};


export const mockAppointments: AppointmentWithRelations[] = [
  {
    id: 'apt-1',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-1',
    startTime: new Date('2026-06-01T09:00:00'),
    endTime: new Date('2026-06-01T10:00:00'),
    status: AppointmentStatus.CONFIRMED,
    createdAt: new Date('2026-05-28T10:00:00'),

    client: {
      id: 'user-1',
      email: 'maria@example.com',
      fullName: 'Maria Garcia',
      phone: '555-1111',
      avatarUrl: null,
      createdAt: new Date('2026-01-01'),
    },

    items: [
      {
        id: 'item-1',
        appointmentId: 'apt-1',
        serviceId: 'svc-1',
        service: {
          id: 'svc-1',
          storeId: 'store-1',
          categoryId: 'cat-1',
          name: 'Haircut',
          durationMin: 30,
          priceCents: 2500,
          type: ServiceType.SINGLE,
          createdAt: new Date('2026-01-01'),
        },
      },
      {
        id: 'item-2',
        appointmentId: 'apt-1',
        serviceId: 'svc-2',
        service: {
          id: 'svc-2',
          storeId: 'store-1',
          categoryId: 'cat-1',
          name: 'Wash',
          durationMin: 30,
          priceCents: 1000,
          type: ServiceType.SINGLE,
          createdAt: new Date('2026-01-01'),
        },
      },
    ],
  },

  {
    id: 'apt-2',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-2',
    startTime: new Date('2026-06-01T10:00:00'),
    endTime: new Date('2026-06-01T11:00:00'),
    status: AppointmentStatus.PENDING,
    createdAt: new Date(),

    client: {
      id: 'user-2',
      email: 'juan@example.com',
      fullName: 'Juan Martinez',
      phone: '555-1112',
      avatarUrl: null,
      createdAt: new Date(),
    },

    items: [
      {
        id: 'item-3',
        appointmentId: 'apt-2',
        serviceId: 'svc-3',
        service: {
          id: 'svc-3',
          storeId: 'store-1',
          categoryId: 'cat-1',
          name: 'Haircut',
          durationMin: 30,
          priceCents: 2500,
          type: ServiceType.SINGLE,
          createdAt: new Date(),
        },
      },
      {
        id: 'item-4',
        appointmentId: 'apt-2',
        serviceId: 'svc-4',
        service: {
          id: 'svc-4',
          storeId: 'store-1',
          categoryId: 'cat-1',
          name: 'Beard Trim',
          durationMin: 15,
          priceCents: 1200,
          type: ServiceType.SINGLE,
          createdAt: new Date(),
        },
      },
      {
        id: 'item-5',
        appointmentId: 'apt-2',
        serviceId: 'svc-5',
        service: {
          id: 'svc-5',
          storeId: 'store-1',
          categoryId: 'cat-1',
          name: 'Wash',
          durationMin: 15,
          priceCents: 1000,
          type: ServiceType.SINGLE,
          createdAt: new Date(),
        },
      },
    ],
  },

  {
    id: 'apt-3',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-3',
    startTime: new Date('2026-06-01T11:00:00'),
    endTime: new Date('2026-06-01T12:00:00'),
    status: AppointmentStatus.CONFIRMED,
    createdAt: new Date(),

    client: {
      id: 'user-3',
      email: 'ana@example.com',
      fullName: 'Ana Lopez',
      phone: '555-1113',
      avatarUrl: null,
      createdAt: new Date(),
    },

    items: [
      {
        id: 'item-6',
        appointmentId: 'apt-3',
        serviceId: 'svc-6',
        service: {
          id: 'svc-6',
          storeId: 'store-1',
          categoryId: 'cat-2',
          name: 'Hair Color',
          durationMin: 60,
          priceCents: 5000,
          type: ServiceType.SINGLE,
          createdAt: new Date(),
        },
      },
    ],
  },

  {
    id: 'apt-4',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-4',
    startTime: new Date('2026-06-01T12:00:00'),
    endTime: new Date('2026-06-01T13:00:00'),
    status: AppointmentStatus.CONFIRMED,
    createdAt: new Date(),
    client: {
      id: 'user-4',
      email: 'carlos@example.com',
      fullName: 'Carlos Ruiz',
      phone: '555-1114',
      avatarUrl: null,
      createdAt: new Date(),
    },
    items: [{
      id: 'item-7',
      appointmentId: 'apt-4',
      serviceId: 'svc-7',
      service: {
        id: 'svc-7',
        storeId: 'store-1',
        categoryId: 'cat-3',
        name: 'Styling',
        durationMin: 60,
        priceCents: 3500,
        type: ServiceType.SINGLE,
        createdAt: new Date(),
      },
    }],
  },

  {
    id: 'apt-5',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-5',
    startTime: new Date('2026-06-01T13:00:00'),
    endTime: new Date('2026-06-01T14:00:00'),
    status: AppointmentStatus.CANCELLED,
    createdAt: new Date(),
    client: {
      id: 'user-5',
      email: 'sofia@example.com',
      fullName: 'Sofia Hernandez',
      phone: '555-1115',
      avatarUrl: null,
      createdAt: new Date(),
    },
    items: [{
      id: 'item-8',
      appointmentId: 'apt-5',
      serviceId: 'svc-8',
      service: {
        id: 'svc-8',
        storeId: 'store-1',
        categoryId: 'cat-1',
        name: 'Haircut',
        durationMin: 60,
        priceCents: 3000,
        type: ServiceType.SINGLE,
        createdAt: new Date(),
      },
    }],
  },

  {
    id: 'apt-6',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-6',
    startTime: new Date('2026-06-01T14:00:00'),
    endTime: new Date('2026-06-01T15:00:00'),
    status: AppointmentStatus.CONFIRMED,
    createdAt: new Date(),
    client: {
      id: 'user-6',
      email: 'miguel@example.com',
      fullName: 'Miguel Torres',
      phone: '555-1116',
      avatarUrl: null,
      createdAt: new Date(),
    },
    items: [{
      id: 'item-9',
      appointmentId: 'apt-6',
      serviceId: 'svc-9',
      service: {
        id: 'svc-9',
        storeId: 'store-1',
        categoryId: 'cat-2',
        name: 'Hair Color',
        durationMin: 60,
        priceCents: 5000,
        type: ServiceType.SINGLE,
        createdAt: new Date(),
      },
    }],
  },

  {
    id: 'apt-7',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-7',
    startTime: new Date('2026-06-01T15:00:00'),
    endTime: new Date('2026-06-01T16:00:00'),
    status: AppointmentStatus.PENDING,
    createdAt: new Date(),
    client: {
      id: 'user-7',
      email: 'laura@example.com',
      fullName: 'Laura Mendoza',
      phone: '555-1117',
      avatarUrl: null,
      createdAt: new Date(),
    },
    items: [{
      id: 'item-10',
      appointmentId: 'apt-7',
      serviceId: 'svc-10',
      service: {
        id: 'svc-10',
        storeId: 'store-1',
        categoryId: 'cat-3',
        name: 'Styling',
        durationMin: 60,
        priceCents: 3500,
        type: ServiceType.SINGLE,
        createdAt: new Date(),
      },
    }],
  },

  {
    id: 'apt-8',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-8',
    startTime: new Date('2026-06-01T16:00:00'),
    endTime: new Date('2026-06-01T17:00:00'),
    status: AppointmentStatus.CONFIRMED,
    createdAt: new Date(),
    client: {
      id: 'user-8',
      email: 'pedro@example.com',
      fullName: 'Pedro Sanchez',
      phone: '555-1118',
      avatarUrl: null,
      createdAt: new Date(),
    },
    items: [{
      id: 'item-11',
      appointmentId: 'apt-8',
      serviceId: 'svc-11',
      service: {
        id: 'svc-11',
        storeId: 'store-1',
        categoryId: 'cat-1',
        name: 'Haircut',
        durationMin: 60,
        priceCents: 3000,
        type: ServiceType.SINGLE,
        createdAt: new Date(),
      },
    }],
  },

  {
    id: 'apt-9',
    storeId: 'store-1',
    staffId: 'staff-1',
    userId: 'user-9',
    startTime: new Date('2026-06-01T17:00:00'),
    endTime: new Date('2026-06-01T18:00:00'),
    status: AppointmentStatus.COMPLETED,
    createdAt: new Date(),
    client: {
      id: 'user-9',
      email: 'gabriela@example.com',
      fullName: 'Gabriela Flores',
      phone: '555-1119',
      avatarUrl: null,
      createdAt: new Date(),
    },
    items: [{
      id: 'item-12',
      appointmentId: 'apt-9',
      serviceId: 'svc-12',
      service: {
        id: 'svc-12',
        storeId: 'store-1',
        categoryId: 'cat-3',
        name: 'Styling',
        durationMin: 60,
        priceCents: 3500,
        type: ServiceType.SINGLE,
        createdAt: new Date(),
      },
    }],
  },
];

export function getAppointments () {
    return mockAppointments
} 




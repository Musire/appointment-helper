import { AppointmentStatus } from "@/generated/prisma";
import { AppointmentDetails, AppointmentHistoryItem, AppointmentMetrics, AppointmentWithRelations } from "./appointment.types";
import dayjs, { toAppTime } from "./utils/dayjs";

const weekStart = dayjs().startOf('week').add(1, 'day');

const weekDate = (day: number, hour: number, minute = 0) =>
  weekStart.add(day, 'day').hour(hour).minute(minute).second(0).millisecond(0).toDate();

const statuses: AppointmentStatus[] = ["PENDING", "PENDING", "CANCELLED", "COMPLETED", "NOSHOW"];

export const AppointmentHistory = {
  "2024-11-15": [
    {
      id: "apt-101",
      storeId: "store-001",
      staffId: "staff-001",
      userId: "user-999",
      startTime: new Date("2024-11-15T09:00:00Z"),
      endTime: new Date("2024-11-15T10:00:00Z"),
      status: "COMPLETED" as AppointmentStatus,
      createdAt: new Date("2024-11-10T12:00:00Z"),
      client: { id: "user-999", name: "John Doe" },
      items: [
        {
          id: "as-1",
          appointmentId: "apt-101",
          serviceId: "srv-1",
          service: {
            id: "srv-1",
            name: "Classic Haircut",
            priceCents: 3500,
            durationMin: 30,
          },
        },
      ],
    },
    ...Array.from({ length: 4 }, (_, i) => ({
      id: `apt-102-${i}`,
      storeId: "store-001",
      staffId: "staff-001",
      userId: `user-${i}`,
      startTime: new Date(`2024-11-15T${11 + i}:00:00Z`),
      endTime: new Date(`2024-11-15T${12 + i}:00:00Z`),
      // Cycles through remaining statuses
      status: statuses[i % statuses.length],
      createdAt: new Date(),
      client: { id: `user-${i}`, name: `Client ${i}` },
      items: [
        {
          id: `as-102-${i}`,
          appointmentId: `apt-102-${i}`,
          serviceId: "srv-2",
        },
      ],
    })),
  ],
  "2024-11-14": Array.from({ length: 10 }, (_, i) => ({
    id: `apt-200-${i}`,
    storeId: "store-001",
    staffId: "staff-002",
    userId: `user-b-${i}`,
    startTime: new Date(`2024-11-14T${9 + i}:00:00Z`),
    endTime: new Date(`2024-11-14T${10 + i}:00:00Z`),
    status: statuses[i % statuses.length],
    createdAt: new Date(),
    client: { id: `user-b-${i}`, name: `Customer ${i}` },
    items: [
      {
        id: `as-200-${i}`,
        appointmentId: `apt-200-${i}`,
        serviceId: "srv-3",
        service: { id: "srv-3", name: "Skin Fade", priceCents: 4000, durationMin: 45},
      },
    ],
  })),
  "2024-11-10": Array.from({ length: 15 }, (_, i) => ({
    id: `apt-300-${i}`,
    storeId: "store-001",
    staffId: "staff-001",
    userId: `user-c-${i}`,
    startTime: new Date(`2024-11-10T${8 + i}:00:00Z`),
    endTime: new Date(`2024-11-10T${9 + i}:00:00Z`),
    status: statuses[i % statuses.length],
    createdAt: new Date(),
    client: { id: `user-c-${i}`, name: `Old Client ${i}` },
    items: [
      {
        id: `as-300-${i}`,
        appointmentId: `apt-300-${i}`,
        serviceId: "srv-4",
        service: { id: "srv-4", name: "Buzz Cut", price: 2500 },
      },
    ],
  })),
  "2024-10-28": Array.from({ length: 10 }, (_, i) => ({
    id: `apt-400-${i}`,
    storeId: "store-001",
    staffId: "staff-003",
    userId: `user-d-${i}`,
    startTime: new Date(`2024-10-28T${10 + i}:00:00Z`),
    endTime: new Date(`2024-10-28T${11 + i}:00:00Z`),
    status: statuses[i % statuses.length],
    createdAt: new Date(),
    client: { id: `user-d-${i}`, name: `Archive Client ${i}` },
    items: [
      {
        id: `as-400-${i}`,
        appointmentId: `apt-400-${i}`,
        serviceId: "srv-5",
        service: { id: "srv-5", name: "Combo Pack", price: 6500,
        },
      }
    ],
  })),
};

export const mockAppointments: AppointmentDetails[] = [
  {
    id: "appt-001",
    client: {
      id: "client-001",
      name: "John Smith",
    },
    barberId: "barber-001",
    store: {
      id: "store-001",
      name: "Downtown Barber Shop",
    },
    scheduledAt: new Date("2026-06-13T09:00:00Z"),
    createdAt: new Date("2026-06-10T12:00:00Z"),
    updatedAt: new Date("2026-06-13T09:02:00Z"),
    checkedAt: new Date("2026-06-13T09:02:00Z"),
    startedAt: null,
    completedAt: null,
    status: "checkedin",
    services: [
      { id: "svc-001", name: "Haircut" },
      { id: "svc-002", name: "Beard Trim" },
    ],
  },
  {
    id: "appt-002",
    client: {
      id: "client-002",
      name: "Michael Johnson",
    },
    barberId: "barber-001",
    store: {
      id: "store-001",
      name: "Downtown Barber Shop",
    },
    scheduledAt: new Date("2026-06-13T09:30:00Z"),
    createdAt: new Date("2026-06-10T13:00:00Z"),
    updatedAt: new Date("2026-06-13T09:30:00Z"),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "pending",
    services: [{ id: "svc-001", name: "Haircut" }],
  },
  {
    id: "appt-003",
    client: {
      id: "client-003",
      name: "David Wilson",
    },
    barberId: "barber-002",
    store: {
      id: "store-001",
      name: "Downtown Barber Shop",
    },
    scheduledAt: new Date("2026-06-13T10:00:00Z"),
    createdAt: new Date("2026-06-10T14:00:00Z"),
    updatedAt: new Date("2026-06-13T10:05:00Z"),
    checkedAt: new Date("2026-06-13T10:01:00Z"),
    startedAt: new Date("2026-06-13T10:05:00Z"),
    completedAt: null,
    status: "inprogress",
    services: [
      { id: "svc-001", name: "Haircut" },
      { id: "svc-003", name: "Hot Towel Shave" },
    ],
  },
  {
    id: "appt-004",
    client: {
      id: "client-004",
      name: "Chris Brown",
    },
    barberId: "barber-002",
    store: {
      id: "store-001",
      name: "Downtown Barber Shop",
    },
    scheduledAt: new Date("2026-06-13T10:30:00Z"),
    createdAt: new Date("2026-06-11T09:00:00Z"),
    updatedAt: new Date("2026-06-13T11:10:00Z"),
    checkedAt: new Date("2026-06-13T10:28:00Z"),
    startedAt: new Date("2026-06-13T10:35:00Z"),
    completedAt: new Date("2026-06-13T11:10:00Z"),
    status: "completed",
    services: [
      { id: "svc-001", name: "Haircut" },
      { id: "svc-004", name: "Hair Wash" },
    ],
  },
  {
    id: "appt-005",
    client: {
      id: "client-005",
      name: "Alex Martinez",
    },
    barberId: "barber-003",
    store: {
      id: "store-001",
      name: "Downtown Barber Shop",
    },
    scheduledAt: new Date("2026-06-13T11:00:00Z"),
    createdAt: new Date("2026-06-11T10:00:00Z"),
    updatedAt: new Date("2026-06-12T18:00:00Z"),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "cancelled",
    services: [{ id: "svc-002", name: "Beard Trim" }],
    notes: "Client cancelled day before appointment.",
  },
  {
    id: "appt-006",
    client: {
      id: "client-006",
      name: "Ryan Garcia",
    },
    barberId: "barber-001",
    store: {
      id: "store-001",
      name: "Downtown Barber Shop",
    },
    scheduledAt: new Date("2026-06-13T11:30:00Z"),
    createdAt: new Date("2026-06-11T11:00:00Z"),
    updatedAt: new Date("2026-06-13T11:45:00Z"),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "noshow",
    services: [{ id: "svc-001", name: "Haircut" }],
  },
  {
    id: "appt-007",
    client: {
      id: "client-007",
      name: "Daniel Lee",
    },
    barberId: "barber-002",
    store: {
      id: "store-001",
      name: "Downtown Barber Shop",
    },
    scheduledAt: new Date("2026-06-13T12:00:00Z"),
    createdAt: new Date("2026-06-11T12:00:00Z"),
    updatedAt: new Date("2026-06-13T12:00:00Z"),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "pending",
    services: [
      { id: "svc-001", name: "Haircut" },
      { id: "svc-005", name: "Eyebrow Trim" },
    ],
  },
  {
    id: "appt-008",
    client: {
      id: "client-008",
      name: "Carlos Hernandez",
    },
    barberId: "barber-003",
    store: {
      id: "store-001",
      name: "Downtown Barber Shop",
    },
    scheduledAt: new Date("2026-06-13T12:30:00Z"),
    createdAt: new Date("2026-06-11T13:00:00Z"),
    updatedAt: new Date("2026-06-13T12:32:00Z"),
    checkedAt: new Date("2026-06-13T12:32:00Z"),
    startedAt: null,
    completedAt: null,
    status: "checkedin",
    services: [{ id: "svc-003", name: "Hot Towel Shave" }],
  },
  {
    id: "appt-009",
    client: {
      id: "client-009",
      name: "Kevin Thomas",
    },
    barberId: "barber-001",
    store: {
      id: "store-001",
      name: "Downtown Barber Shop",
    },
    scheduledAt: new Date("2026-06-13T13:00:00Z"),
    createdAt: new Date("2026-06-11T14:00:00Z"),
    updatedAt: new Date("2026-06-13T13:05:00Z"),
    checkedAt: new Date("2026-06-13T13:01:00Z"),
    startedAt: new Date("2026-06-13T13:05:00Z"),
    completedAt: null,
    status: "inprogress",
    services: [
      { id: "svc-001", name: "Haircut" },
      { id: "svc-002", name: "Beard Trim" },
    ],
  },
  {
    id: "appt-010",
    client: {
      id: "client-010",
      name: "Luis Rodriguez",
    },
    barberId: "barber-002",
    store: {
      id: "store-001",
      name: "Downtown Barber Shop",
    },
    scheduledAt: new Date("2026-06-13T13:30:00Z"),
    createdAt: new Date("2026-06-11T15:00:00Z"),
    updatedAt: new Date("2026-06-13T13:30:00Z"),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "pending",
    services: [{ id: "svc-004", name: "Hair Wash" }],
  },
];

export function getPool () {
    return mockAppointments
}

export const appointmentMocks: AppointmentDetails[] = [
  {
    id: "appt-001",
    client: { id: "c-3", name: "Alex Johnson" },
    barberId: "barber-3",
    store: { id: "store-1", name: "Downtown Chop Shop" },
    // 09:30 AM Chihuahua = 15:30 UTC
    scheduledAt: weekDate(3, 9, 30),
    createdAt: weekDate(2, 10, 0),
    updatedAt: weekDate(3, 9, 30),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "pending",
    services: [{ id: "s-4", name: "Hair Washing & Styling" }]
  },
  {
    id: "appt-002",
    client: { id: "c-9", name: "William Anderson" },
    barberId: "barber-3",
    store: { id: "store-1", name: "Downtown Chop Shop" },
    // 10:15 AM Chihuahua = 16:15 UTC
    scheduledAt: weekDate(3, 10, 15),
    createdAt: weekDate(5, 11, 15),
    updatedAt: weekDate(3, 10, 15),
    checkedAt: weekDate(3, 10, 5),
    startedAt: null,
    completedAt: null,
    status: "checkedin",
    services: [{ id: "s-2", name: "Beard Trim & Shape" }, { id: "s-4", name: "Hair Washing & Styling" }],
    notes: "Client requested a clean fade."
  },
  {
    id: "appt-003",
    client: { id: "c-4", name: "Michael Brown" },
    barberId: "barber-1",
    store: { id: "store-2", name: "Westside Grooming Lounge" },
    // 11:45 AM Chihuahua = 17:45 UTC
    scheduledAt: weekDate(3, 11, 45),
    createdAt: weekDate(0, 12, 45),
    updatedAt: weekDate(3, 11, 45),
    checkedAt: weekDate(3, 11, 35),
    startedAt: weekDate(3, 11, 50),
    completedAt: null,
    status: "inprogress",
    services: [{ id: "s-4", name: "Hair Washing & Styling" }]
  },
  {
    id: "appt-004",
    client: { id: "c-9", name: "William Anderson" },
    barberId: "barber-2",
    store: { id: "store-1", name: "Downtown Chop Shop" },
    // 01:30 PM Chihuahua = 19:30 UTC
    scheduledAt: weekDate(3, 13, 30),
    createdAt: weekDate(3, 9, 30),
    updatedAt: weekDate(3, 14, 5),
    checkedAt: weekDate(3, 13, 20),
    startedAt: weekDate(3, 13, 35),
    completedAt: weekDate(3, 14, 5),
    status: "completed",
    services: [{ id: "s-3", name: "Hot Towel Shave" }],
    notes: "Client requested a clean fade."
  },
  {
    id: "appt-005",
    client: { id: "c-4", name: "Michael Brown" },
    barberId: "barber-1",
    store: { id: "store-2", name: "Westside Grooming Lounge" },
    // 03:00 PM Chihuahua = 21:00 UTC
    scheduledAt: weekDate(3, 15, 0),
    createdAt: weekDate(2, 9, 15),
    updatedAt: weekDate(3, 15, 0),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "noshow",
    services: [{ id: "s-1", name: "Classic Haircut" }]
  },
  {
    id: "appt-006",
    client: { id: "c-5", name: "David Miller" },
    barberId: "barber-3",
    store: { id: "store-1", name: "Downtown Chop Shop" },
    // 04:15 PM Chihuahua = 22:15 UTC
    scheduledAt: weekDate(3, 16, 15),
    createdAt: weekDate(1, 12, 15),
    updatedAt: weekDate(3, 16, 15),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "cancelled",
    services: [{ id: "s-2", name: "Beard Trim & Shape" }]
  },
  {
    id: "appt-007",
    client: { id: "c-1", name: "John Doe" },
    barberId: "barber-2",
    store: { id: "store-2", name: "Westside Grooming Lounge" },
    // 09:00 AM Chihuahua = 15:00 UTC
    scheduledAt: weekDate(4, 9, 0),
    createdAt: weekDate(1, 9, 15),
    updatedAt: weekDate(4, 9, 0),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "pending",
    services: [{ id: "s-1", name: "Classic Haircut" }, { id: "s-4", name: "Hair Washing & Styling" }],
    notes: "Client requested a clean fade."
  },
  {
    id: "appt-008",
    client: { id: "c-8", name: "Robert Taylor" },
    barberId: "barber-2",
    store: { id: "store-1", name: "Downtown Chop Shop" },
    // 10:45 AM Chihuahua = 16:45 UTC
    scheduledAt: weekDate(4, 10, 45),
    createdAt: weekDate(1, 11, 15),
    updatedAt: weekDate(4, 10, 45),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "pending",
    services: [{ id: "s-2", name: "Beard Trim & Shape" }],
    notes: "Client requested a clean fade."
  },
  {
    id: "appt-009",
    client: { id: "c-4", name: "Michael Brown" },
    barberId: "barber-3",
    store: { id: "store-1", name: "Downtown Chop Shop" },
    // 11:30 AM Chihuahua = 17:30 UTC
    scheduledAt: weekDate(4, 11, 30),
    createdAt: weekDate(0, 10, 45),
    updatedAt: weekDate(4, 11, 30),
    checkedAt: weekDate(4, 11, 20),
    startedAt: null,
    completedAt: null,
    status: "checkedin",
    services: [{ id: "s-1", name: "Classic Haircut" }, { id: "s-4", name: "Hair Washing & Styling" }],
    notes: "Client requested a clean fade."
  },
  {
    id: "appt-010",
    client: { id: "c-7", name: "James Wilson" },
    barberId: "barber-3",
    store: { id: "store-2", name: "Westside Grooming Lounge" },
    // 01:15 PM Chihuahua = 19:15 UTC
    scheduledAt: weekDate(4, 13, 15),
    createdAt: weekDate(5, 13, 45),
    updatedAt: weekDate(4, 13, 15),
    checkedAt: weekDate(4, 12, 5),
    startedAt: null,
    completedAt: null,
    status: "checkedin",
    services: [{ id: "s-1", name: "Classic Haircut" }, { id: "s-3", name: "Hot Towel Shave" }],
    notes: "Client requested a clean fade."
  },
  {
    id: "appt-011",
    client: { id: "c-7", name: "James Wilson" },
    barberId: "barber-2",
    store: { id: "store-1", name: "Downtown Chop Shop" },
    // 02:45 PM Chihuahua = 20:45 UTC
    scheduledAt: weekDate(4, 14, 45),
    createdAt: weekDate(2, 9, 30),
    updatedAt: weekDate(4, 14, 45),
    checkedAt: weekDate(4, 14, 35),
    startedAt: weekDate(4, 14, 50),
    completedAt: null,
    status: "inprogress",
    services: [{ id: "s-3", name: "Hot Towel Shave" }],
    notes: "Client requested a clean fade."
  },
  {
    id: "appt-012",
    client: { id: "c-10", name: "Daniel Thomas" },
    barberId: "barber-1",
    store: { id: "store-1", name: "Downtown Chop Shop" },
    // 04:00 PM Chihuahua = 22:00 UTC
    scheduledAt: weekDate(4, 16, 0),
    createdAt: weekDate(0, 10, 0),
    updatedAt: weekDate(4, 16, 30),
    checkedAt: weekDate(4, 15, 50),
    startedAt: weekDate(4, 16, 0),
    completedAt: weekDate(4, 16, 30),
    status: "completed",
    services: [{ id: "s-2", name: "Beard Trim & Shape" }, { id: "s-3", name: "Hot Towel Shave" }],
    notes: "Client requested a clean fade."
  },
  {
    id: "appt-013",
    client: { id: "c-6", name: "Chris Davis" },
    barberId: "barber-1",
    store: { id: "store-2", name: "Westside Grooming Lounge" },
    // 09:15 AM Chihuahua = 15:15 UTC
    scheduledAt: weekDate(5, 9, 15),
    createdAt: weekDate(1, 12, 30),
    updatedAt: weekDate(5, 9, 15),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "pending",
    services: [{ id: "s-2", name: "Beard Trim & Shape" }],
    notes: "Client requested a clean fade."
  },
  {
    id: "appt-014",
    client: { id: "c-3", name: "Alex Johnson" },
    barberId: "barber-3",
    store: { id: "store-2", name: "Westside Grooming Lounge" },
    // 10:30 AM Chihuahua = 16:30 UTC
    scheduledAt: weekDate(5, 10, 30),
    createdAt: weekDate(0, 9, 45),
    updatedAt: weekDate(5, 10, 30),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: "pending",
    services: [{ id: "s-3", name: "Hot Towel Shave" }],
    notes: "Client requested a clean fade."
  },
  {
    id: "appt-015",
    client: { id: "c-4", name: "Michael Brown" },
    barberId: "barber-2",
    store: { id: "store-2", name: "Westside Grooming Lounge" },
    // 11:00 AM Chihuahua = 17:00 UTC
    scheduledAt: weekDate(5, 11, 0),
    createdAt: weekDate(0, 9, 15),
    updatedAt: weekDate(5, 11, 0),
    checkedAt: weekDate(5, 10, 50),
    startedAt: null,
    completedAt: null,
    status: "checkedin",
    services: [{ id: "s-4", name: "Hair Washing & Styling" }, { id: "s-3", name: "Hot Towel Shave" }]
  },
  {
    id: "appt-016",
    client: { id: "c-9", name: "William Anderson" },
    barberId: "barber-3",
    store: { id: "store-1", name: "Downtown Chop Shop" },
    // 12:45 PM Chihuahua = 18:45 UTC
    scheduledAt: weekDate(5, 12, 45),
    createdAt: weekDate(0, 11, 0),
    updatedAt: weekDate(5, 12, 45),
    checkedAt: weekDate(5, 12, 35),
    startedAt: null,
    completedAt: null,
    status: "checkedin",
    services: [{ id: "s-1", name: "Classic Haircut" }]
  },
  {
    id: "appt-017",
    client: { id: "c-2", name: "Jane Smith" },
    barberId: "barber-2",
    store: { id: "store-1", name: "Downtown Chop Shop" },
    // 01:15 PM Chihuahua = 19:15 UTC
    scheduledAt: weekDate(5, 13, 15),
    createdAt: weekDate(4, 8, 15),
    updatedAt: weekDate(5, 13, 15),
    checkedAt: weekDate(5, 13, 5),
    startedAt: weekDate(5, 13, 20),
    completedAt: null,
    status: "inprogress",
    services: [{ id: "s-2", name: "Beard Trim & Shape" }, { id: "s-3", name: "Hot Towel Shave" }]
  }
]

export function getAppointmentDetails(
  id: string
): AppointmentDetails | undefined {
  return appointmentMocks.find((appointment) => appointment.id === id);
}

export function filterAppointmentToday(mockData: AppointmentDetails[]) {
  // 1. Convert your "right now" UTC anchor into your app's local timezone
  const todayAnchor = toAppTime(new Date());

  // 2. Filter using dayjs.isSame() comparing by 'day'
  return mockData.filter(item => 
    item.scheduledAt && toAppTime(item.scheduledAt).isSame(todayAnchor, "day")
  );
}

export function getAppointmentMetrics(appointments: AppointmentDetails[]): AppointmentMetrics {
  return appointments.reduce<AppointmentMetrics>(
    (acc, current) => {
      if (current.status === "pending") acc.pending++;
      
      // ✨ Combines checkedin + inprogress states into the single checkedIn metric
      if (current.status === "checkedin" || current.status === "inprogress") {
        acc.checkedIn++;
      }
      
      if (current.status === "completed") acc.completed++;
      
      return acc;
    },
    { pending: 0, checkedIn: 0, completed: 0 }
  );
}

const appointmentHistoryMock: AppointmentHistoryItem[] = [
  {
    id: 'appt-001',
    scheduledAt: new Date('2026-05-26T09:00:00'),
    clientName: 'John Smith',
    status: 'COMPLETED',
  },
  {
    id: 'appt-002',
    scheduledAt: new Date('2026-05-26T14:30:00'),
    clientName: 'Maria Garcia',
    status: 'COMPLETED',
  },
  {
    id: 'appt-003',
    scheduledAt: new Date('2026-05-27T08:15:00'),
    clientName: 'Robert Johnson',
    status: 'CANCELLED',
  },
  {
    id: 'appt-004',
    scheduledAt: new Date('2026-05-27T11:00:00'),
    clientName: 'Jennifer Davis',
    status: 'COMPLETED',
  },
  {
    id: 'appt-005',
    scheduledAt: new Date('2026-05-27T16:45:00'),
    clientName: 'Michael Brown',
    status: 'NOSHOW',
  },
  {
    id: 'appt-006',
    scheduledAt: new Date('2026-05-28T09:30:00'),
    clientName: 'Patricia Wilson',
    status: 'COMPLETED',
  },
  {
    id: 'appt-007',
    scheduledAt: new Date('2026-05-28T13:00:00'),
    clientName: 'David Martinez',
    status: 'COMPLETED',
  },
  {
    id: 'appt-008',
    scheduledAt: new Date('2026-05-29T10:00:00'),
    clientName: 'Linda Anderson',
    status: 'COMPLETED',
  },
  {
    id: 'appt-009',
    scheduledAt: new Date('2026-05-29T15:15:00'),
    clientName: 'James Thomas',
    status: 'CANCELLED',
  },
  {
    id: 'appt-010',
    scheduledAt: new Date('2026-05-30T08:45:00'),
    clientName: 'Barbara Jackson',
    status: 'COMPLETED',
  },
  {
    id: 'appt-011',
    scheduledAt: new Date('2026-05-30T12:30:00'),
    clientName: 'Christopher White',
    status: 'NOSHOW',
  },
  {
    id: 'appt-012',
    scheduledAt: new Date('2026-05-31T09:15:00'),
    clientName: 'Susan Harris',
    status: 'COMPLETED',
  },
  {
    id: 'appt-013',
    scheduledAt: new Date('2026-06-01T11:45:00'),
    clientName: 'Daniel Clark',
    status: 'COMPLETED',
  },
  {
    id: 'appt-014',
    scheduledAt: new Date('2026-06-01T14:00:00'),
    clientName: 'Jessica Lewis',
    status: 'COMPLETED',
  },
  {
    id: 'appt-015',
    scheduledAt: new Date('2026-06-02T09:00:00'),
    clientName: 'Matthew Walker',
    status: 'COMPLETED',
  },
]

export function getAppointmentHistory () {
    return appointmentHistoryMock
}

const createdDate = () => dayjs().toDate();

export const mockUpcomingAppointments: AppointmentWithRelations[] = [
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
      authId: 'user-auth-1',
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
      authId: 'user-auth-2',
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
      authId: 'user-auth-3',
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
      authId: 'user-auth-4',
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
      authId: 'user-auth-5',
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
      authId: 'user-auth-6',
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
      authId: 'user-auth-7',
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
      authId: 'user-auth-8',
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
      authId: 'user-auth-9',
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
import { toAppTime } from "@/lib/dayjs";

export type AppointmentMetrics = {
  pending: number;
  checkedIn: number;
  completed: number;
};

export type AppointmentStatus = 
  | 'pending' 
  | 'checkedin' 
  | 'inprogress' 
  | 'completed' 
  | 'cancelled' 
  | 'noshow';

// 1. Defined a new Client structure
export type ClientDetails = {
  id: string;
  name: string;
};

export type StoreDetails = {
  id: string;
  name: string;
}

export type ServiceDetails = {
  id: string;
  name: string;
}

export type AppointmentDetails = {
  id: string;
  client: ClientDetails;
  barberId: string;        
  store: StoreDetails;     
  scheduledAt: Date;       
  createdAt: Date;
  updatedAt: Date;
  checkedAt: Date | null;   
  startedAt: Date | null;   
  completedAt: Date | null; 
  status: AppointmentStatus;
  services: ServiceDetails[];      
  notes?: string;          
};


export const appointmentMocks: AppointmentDetails[] = [
  {
    id: "appt-001",
    client: { id: "c-3", name: "Alex Johnson" },
    barberId: "barber-3",
    store: { id: "store-1", name: "Downtown Chop Shop" },
    // 09:30 AM Chihuahua = 15:30 UTC
    scheduledAt: new Date("2026-07-02T15:30:00Z"),
    createdAt: new Date("2026-07-01T16:00:00Z"),
    updatedAt: new Date("2026-07-02T15:30:00Z"),
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
    scheduledAt: new Date("2026-07-02T16:15:00Z"),
    createdAt: new Date("2026-06-27T17:15:00Z"),
    updatedAt: new Date("2026-07-02T16:15:00Z"),
    checkedAt: new Date("2026-07-02T16:05:00Z"),
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
    scheduledAt: new Date("2026-07-02T17:45:00Z"),
    createdAt: new Date("2026-06-29T18:45:00Z"),
    updatedAt: new Date("2026-07-02T17:45:00Z"),
    checkedAt: new Date("2026-07-02T17:35:00Z"),
    startedAt: new Date("2026-07-02T17:50:00Z"),
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
    scheduledAt: new Date("2026-07-02T19:30:00Z"),
    createdAt: new Date("2026-07-02T15:30:00Z"),
    updatedAt: new Date("2026-07-02T20:05:00Z"),
    checkedAt: new Date("2026-07-02T19:20:00Z"),
    startedAt: new Date("2026-07-02T19:35:00Z"),
    completedAt: new Date("2026-07-02T20:05:00Z"),
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
    scheduledAt: new Date("2026-07-02T21:00:00Z"),
    createdAt: new Date("2026-07-01T15:15:00Z"),
    updatedAt: new Date("2026-07-02T21:00:00Z"),
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
    scheduledAt: new Date("2026-07-02T22:15:00Z"),
    createdAt: new Date("2026-06-30T18:15:00Z"),
    updatedAt: new Date("2026-07-02T22:15:00Z"),
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
    scheduledAt: new Date("2026-07-03T15:00:00Z"),
    createdAt: new Date("2026-06-30T15:15:00Z"),
    updatedAt: new Date("2026-07-03T15:00:00Z"),
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
    scheduledAt: new Date("2026-07-03T16:45:00Z"),
    createdAt: new Date("2026-06-30T17:15:00Z"),
    updatedAt: new Date("2026-07-03T16:45:00Z"),
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
    scheduledAt: new Date("2026-07-03T17:30:00Z"),
    createdAt: new Date("2026-06-29T16:45:00Z"),
    updatedAt: new Date("2026-07-03T17:30:00Z"),
    checkedAt: new Date("2026-07-03T17:20:00Z"),
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
    scheduledAt: new Date("2026-07-03T19:15:00Z"),
    createdAt: new Date("2026-06-27T19:45:00Z"),
    updatedAt: new Date("2026-07-03T19:15:00Z"),
    checkedAt: new Date("2026-07-03T19:05:00Z"),
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
    scheduledAt: new Date("2026-07-03T20:45:00Z"),
    createdAt: new Date("2026-07-01T15:30:00Z"),
    updatedAt: new Date("2026-07-03T20:45:00Z"),
    checkedAt: new Date("2026-07-03T20:35:00Z"),
    startedAt: new Date("2026-07-03T20:50:00Z"),
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
    scheduledAt: new Date("2026-07-03T22:00:00Z"),
    createdAt: new Date("2026-06-29T16:00:00Z"),
    updatedAt: new Date("2026-07-03T22:30:00Z"),
    checkedAt: new Date("2026-07-03T21:50:00Z"),
    startedAt: new Date("2026-07-03T22:00:00Z"),
    completedAt: new Date("2026-07-03T22:30:00Z"),
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
    scheduledAt: new Date("2026-07-04T15:15:00Z"),
    createdAt: new Date("2026-06-30T18:30:00Z"),
    updatedAt: new Date("2026-07-04T15:15:00Z"),
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
    scheduledAt: new Date("2026-07-04T16:30:00Z"),
    createdAt: new Date("2026-07-01T15:45:00Z"),
    updatedAt: new Date("2026-07-04T16:30:00Z"),
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
    scheduledAt: new Date("2026-07-04T17:00:00Z"),
    createdAt: new Date("2026-06-29T15:15:00Z"),
    updatedAt: new Date("2026-07-04T17:00:00Z"),
    checkedAt: new Date("2026-07-04T16:50:00Z"),
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
    scheduledAt: new Date("2026-07-04T18:45:00Z"),
    createdAt: new Date("2026-06-29T17:00:00Z"),
    updatedAt: new Date("2026-07-04T18:45:00Z"),
    checkedAt: new Date("2026-07-04T18:35:00Z"),
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
    scheduledAt: new Date("2026-07-04T19:15:00Z"),
    createdAt: new Date("2026-07-03T14:15:00Z"),
    updatedAt: new Date("2026-07-04T19:15:00Z"),
    checkedAt: new Date("2026-07-04T19:05:00Z"),
    startedAt: new Date("2026-07-04T19:20:00Z"),
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
import dayjs, { toAppTime } from "@/lib/dayjs"

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
    id: 'appt-001',
    client: { id: 'client-maria-gomez', name: 'Maria Gomez' },
    barberId: 'barber-johnny-quick',
    store: { id: 'store-uptown', name: 'Uptown Store' },
    scheduledAt: new Date('2026-06-23T12:15:00Z'),
    createdAt: new Date('2026-06-18T10:15:00Z'),
    updatedAt: new Date('2026-06-23T12:43:00Z'),
    checkedAt: new Date('2026-06-23T12:07:00Z'),
    startedAt: new Date('2026-06-23T12:13:00Z'),
    completedAt: new Date('2026-06-23T12:43:00Z'),
    status: 'completed',
    services: [{ id: 'svc-classic-haircut', name: 'Classic Haircut' }],
    notes: 'Classic cut requested',
  },
  {
    id: 'appt-002',
    client: { id: 'client-alex-jones', name: 'Alex Jones' },
    barberId: 'barber-johnny-quick',
    store: { id: 'store-downtown', name: 'Downtown Store' },
    scheduledAt: new Date('2026-06-23T09:15:00Z'),
    createdAt: new Date('2026-06-21T01:15:00Z'),
    updatedAt: new Date('2026-06-23T09:28:00Z'),
    checkedAt: new Date('2026-06-23T09:09:00Z'),
    startedAt: new Date('2026-06-23T09:13:00Z'),
    completedAt: new Date('2026-06-23T09:28:00Z'),
    status: 'completed',
    services: [{ id: 'svc-buzz-cut', name: 'Buzz Cut' }],
    notes: 'Number 2 all over',
  },
  {
    id: 'appt-003',
    client: { id: 'client-david-miller', name: 'David Miller' },
    barberId: 'barber-ray-fade',
    store: { id: 'store-uptown', name: 'Uptown Store' },
    scheduledAt: new Date('2026-06-24T13:15:00Z'),
    createdAt: new Date('2026-06-21T11:15:00Z'),
    updatedAt: new Date('2026-06-24T13:34:00Z'),
    checkedAt: new Date('2026-06-24T13:07:00Z'),
    startedAt: new Date('2026-06-24T13:14:00Z'),
    completedAt: new Date('2026-06-24T13:34:00Z'),
    status: 'completed',
    services: [{ id: 'svc-beard-trim', name: 'Beard Trim' }],
    notes: 'Line up beard',
  },
  {
    id: 'appt-004',
    client: { id: 'client-jessica-wilson', name: 'Jessica Wilson' },
    barberId: 'barber-sam-sharp',
    store: { id: 'store-uptown', name: 'Uptown Store' },
    scheduledAt: new Date('2026-06-22T16:00:00Z'),
    createdAt: new Date('2026-06-21T07:00:00Z'),
    updatedAt: new Date('2026-06-22T16:18:00Z'),
    checkedAt: new Date('2026-06-22T15:45:00Z'),
    startedAt: new Date('2026-06-22T16:03:00Z'),
    completedAt: new Date('2026-06-22T16:18:00Z'),
    status: 'completed',
    services: [{ id: 'svc-buzz-cut', name: 'Buzz Cut' }],
    notes: 'Number 2 all over',
  },
  {
    id: 'appt-005',
    client: { id: 'client-lisa-taylor', name: 'Lisa Taylor' },
    barberId: 'barber-johnny-quick',
    store: { id: 'store-downtown', name: 'Downtown Store' },
    scheduledAt: new Date('2026-06-22T12:30:00Z'),
    createdAt: new Date('2026-06-20T10:30:00Z'),
    updatedAt: new Date('2026-06-22T13:05:00Z'),
    checkedAt: new Date('2026-06-22T12:24:00Z'),
    startedAt: new Date('2026-06-22T12:35:00Z'),
    completedAt: new Date('2026-06-22T13:05:00Z'),
    status: 'completed',
    services: [{ id: 'svc-classic-haircut', name: 'Classic Haircut' }],
    notes: 'Classic cut requested',
  },
  {
    id: 'appt-006',
    client: { id: 'client-jessica-wilson', name: 'Jessica Wilson' },
    barberId: 'barber-johnny-quick',
    store: { id: 'store-uptown', name: 'Uptown Store' },
    scheduledAt: new Date('2026-06-24T12:30:00Z'),
    createdAt: new Date('2026-06-19T09:30:00Z'),
    updatedAt: new Date('2026-06-24T13:01:00Z'),
    checkedAt: new Date('2026-06-24T12:17:00Z'),
    startedAt: new Date('2026-06-24T12:31:00Z'),
    completedAt: new Date('2026-06-24T13:01:00Z'),
    status: 'completed',
    services: [{ id: 'svc-classic-haircut', name: 'Classic Haircut' }],
    notes: 'Classic cut requested',
  },
  {
    id: 'appt-007',
    client: { id: 'client-david-miller', name: 'David Miller' },
    barberId: 'barber-sam-sharp',
    store: { id: 'store-uptown', name: 'Uptown Store' },
    scheduledAt: new Date('2026-06-24T12:30:00Z'),
    createdAt: new Date('2026-06-22T11:30:00Z'),
    updatedAt: new Date('2026-06-24T00:30:00Z'),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: 'cancelled',
    services: [{ id: 'svc-classic-haircut', name: 'Classic Haircut' }],
    notes: 'Cancelled by client',
  },
  {
    id: 'appt-008',
    client: { id: 'client-kevin-thomas', name: 'Kevin Thomas' },
    barberId: 'barber-sam-sharp',
    store: { id: 'store-downtown', name: 'Downtown Store' },
    scheduledAt: new Date('2026-06-23T14:15:00Z'),
    createdAt: new Date('2026-06-19T06:15:00Z'),
    updatedAt: new Date('2026-06-23T14:30:00Z'),
    checkedAt: new Date('2026-06-23T14:09:00Z'),
    startedAt: new Date('2026-06-23T14:15:00Z'),
    completedAt: new Date('2026-06-23T14:30:00Z'),
    status: 'completed',
    services: [{ id: 'svc-buzz-cut', name: 'Buzz Cut' }],
    notes: 'Number 2 all over',
  },
  {
    id: 'appt-009',
    client: { id: 'client-emily-davis', name: 'Emily Davis' },
    barberId: 'barber-ray-fade',
    store: { id: 'store-uptown', name: 'Uptown Store' },
    scheduledAt: new Date('2026-06-26T15:45:00Z'),
    createdAt: new Date('2026-06-24T12:45:00Z'),
    updatedAt: new Date('2026-06-26T16:44:00Z'),
    checkedAt: new Date('2026-06-26T15:36:00Z'),
    startedAt: new Date('2026-06-26T15:44:00Z'),
    completedAt: new Date('2026-06-26T16:44:00Z'),
    status: 'completed',
    services: [{ id: 'svc-shave-haircut', name: 'Haircut & Shave' }],
    notes: 'Full service treatment',
  },
  {
    id: 'appt-010',
    client: { id: 'client-alex-jones', name: 'Alex Jones' },
    barberId: 'barber-johnny-quick',
    store: { id: 'store-downtown', name: 'Downtown Store' },
    scheduledAt: new Date('2026-06-23T15:00:00Z'),
    createdAt: new Date('2026-06-19T05:00:00Z'),
    updatedAt: new Date('2026-06-23T15:17:00Z'),
    checkedAt: new Date('2026-06-23T14:50:00Z'),
    startedAt: new Date('2026-06-23T15:02:00Z'),
    completedAt: new Date('2026-06-23T15:17:00Z'),
    status: 'completed',
    services: [{ id: 'svc-buzz-cut', name: 'Buzz Cut' }],
    notes: 'Number 2 all over',
  },
  {
    id: 'appt-011',
    client: { id: 'client-james-anderson', name: 'James Anderson' },
    barberId: 'barber-johnny-quick',
    store: { id: 'store-downtown', name: 'Downtown Store' },
    scheduledAt: new Date('2026-06-26T13:30:00Z'),
    createdAt: new Date('2026-06-23T06:30:00Z'),
    updatedAt: new Date('2026-06-26T13:58:00Z'),
    checkedAt: new Date('2026-06-26T13:21:00Z'),
    startedAt: new Date('2026-06-26T13:28:00Z'),
    completedAt: new Date('2026-06-26T13:58:00Z'),
    status: 'completed',
    services: [{ id: 'svc-classic-haircut', name: 'Classic Haircut' }],
    notes: 'Classic cut requested',
  },
  {
    id: 'appt-012',
    client: { id: 'client-michael-brown', name: 'Michael Brown' },
    barberId: 'barber-ray-fade',
    store: { id: 'store-downtown', name: 'Downtown Store' },
    scheduledAt: new Date('2026-06-26T10:30:00Z'),
    createdAt: new Date('2026-06-24T04:30:00Z'),
    updatedAt: new Date('2026-06-26T03:30:00Z'),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: 'cancelled',
    services: [{ id: 'svc-beard-trim', name: 'Beard Trim' }],
    notes: 'Cancelled by client',
  },
  {
    id: 'appt-013',
    client: { id: 'client-james-anderson', name: 'James Anderson' },
    barberId: 'barber-ray-fade',
    store: { id: 'store-downtown', name: 'Downtown Store' },
    scheduledAt: new Date('2026-06-26T14:45:00Z'),
    createdAt: new Date('2026-06-25T08:45:00Z'),
    updatedAt: new Date('2026-06-26T03:45:00Z'),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: 'cancelled',
    services: [{ id: 'svc-classic-haircut', name: 'Classic Haircut' }],
    notes: 'Cancelled by client',
  },
  {
    id: 'appt-014',
    client: { id: 'client-emily-davis', name: 'Emily Davis' },
    barberId: 'barber-johnny-quick',
    store: { id: 'store-downtown', name: 'Downtown Store' },
    scheduledAt: new Date('2026-06-26T10:00:00Z'),
    createdAt: new Date('2026-06-25T01:00:00Z'),
    updatedAt: new Date('2026-06-26T04:00:00Z'),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: 'cancelled',
    services: [{ id: 'svc-buzz-cut', name: 'Buzz Cut' }],
    notes: 'Cancelled by client',
  },
  {
    id: 'appt-015',
    client: { id: 'client-david-miller', name: 'David Miller' },
    barberId: 'barber-ray-fade',
    store: { id: 'store-uptown', name: 'Uptown Store' },
    scheduledAt: new Date('2026-06-26T11:30:00Z'),
    createdAt: new Date('2026-06-24T02:30:00Z'),
    updatedAt: new Date('2026-06-25T11:30:00Z'),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: 'cancelled',
    services: [{ id: 'svc-buzz-cut', name: 'Buzz Cut' }],
    notes: 'Cancelled by client',
  },
  {
    id: 'appt-016',
    client: { id: 'client-emily-davis', name: 'Emily Davis' },
    barberId: 'barber-ray-fade',
    store: { id: 'store-uptown', name: 'Uptown Store' },
    scheduledAt: new Date('2026-06-25T14:45:00Z'),
    createdAt: new Date('2026-06-24T10:45:00Z'),
    updatedAt: new Date('2026-06-25T15:03:00Z'),
    checkedAt: new Date('2026-06-25T14:42:00Z'),
    startedAt: new Date('2026-06-25T14:48:00Z'),
    completedAt: new Date('2026-06-25T15:03:00Z'),
    status: 'completed',
    services: [{ id: 'svc-buzz-cut', name: 'Buzz Cut' }],
    notes: 'Number 2 all over',
  },
  {
    id: 'appt-017',
    client: { id: 'client-alex-jones', name: 'Alex Jones' },
    barberId: 'barber-ray-fade',
    store: { id: 'store-downtown', name: 'Downtown Store' },
    scheduledAt: new Date('2026-06-26T12:00:00Z'),
    createdAt: new Date('2026-06-25T08:00:00Z'),
    updatedAt: new Date('2026-06-26T12:33:00Z'),
    checkedAt: new Date('2026-06-26T11:58:00Z'),
    startedAt: new Date('2026-06-26T12:03:00Z'),
    completedAt: new Date('2026-06-26T12:33:00Z'),
    status: 'completed',
    services: [{ id: 'svc-classic-haircut', name: 'Classic Haircut' }],
    notes: 'Classic cut requested',
  },
  {
    id: 'appt-018',
    client: { id: 'client-maria-gomez', name: 'Maria Gomez' },
    barberId: 'barber-ray-fade',
    store: { id: 'store-downtown', name: 'Downtown Store' },
    scheduledAt: new Date('2026-06-24T16:15:00Z'),
    createdAt: new Date('2026-06-19T06:15:00Z'),
    updatedAt: new Date('2026-06-24T16:40:00Z'),
    checkedAt: new Date('2026-06-24T16:10:00Z'),
    startedAt: new Date('2026-06-24T16:20:00Z'),
    completedAt: new Date('2026-06-24T16:40:00Z'),
    status: 'completed',
    services: [{ id: 'svc-beard-trim', name: 'Beard Trim' }],
    notes: 'Line up beard',
  },
  {
    id: 'appt-019',
    client: { id: 'client-kevin-thomas', name: 'Kevin Thomas' },
    barberId: 'barber-johnny-quick',
    store: { id: 'store-downtown', name: 'Downtown Store' },
    scheduledAt: new Date('2026-06-22T15:30:00Z'),
    createdAt: new Date('2026-06-18T07:30:00Z'),
    updatedAt: new Date('2026-06-22T12:30:00Z'),
    checkedAt: null,
    startedAt: null,
    completedAt: null,
    status: 'cancelled',
    services: [{ id: 'svc-buzz-cut', name: 'Buzz Cut' }],
    notes: 'Cancelled by client',
  },
  {
    id: 'appt-020',
    client: { id: 'client-maria-gomez', name: 'Maria Gomez' },
    barberId: 'barber-johnny-quick',
    store: { id: 'store-uptown', name: 'Uptown Store' },
    scheduledAt: new Date('2026-06-24T10:15:00Z'),
    createdAt: new Date('2026-06-22T01:15:00Z'),
    updatedAt: new Date('2026-06-24T10:39:00Z'),
    checkedAt: new Date('2026-06-24T10:11:00Z'),
    startedAt: new Date('2026-06-24T10:19:00Z'),
    completedAt: new Date('2026-06-24T10:39:00Z'),
    status: 'completed',
    services: [{ id: 'svc-beard-trim', name: 'Beard Trim' }],
    notes: 'Line up beard',
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
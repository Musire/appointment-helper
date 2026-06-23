export type AppointmentHistoryItem = {
  id: string
  scheduledAt: Date
  clientName: string
  status: 'COMPLETED' | 'CANCELLED' | 'NOSHOW'
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
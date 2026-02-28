import { AppointmentStatus, ServiceType } from "@/generated/prisma";

// This represents a single Service object
export type ServiceMock = {
  id: string;
  name: string;
  priceCents: number;
  durationMin: number;
  type: ServiceType;
};

// This represents the join table (AppointmentService)
export type AppointmentServiceMock = {
  id: string;
  appointmentId: string;
  serviceId: string;
  service: ServiceMock; // The nested service
};

// The Full Appointment with its relations
export type AppointmentWithRelations = {
  id: string;
  storeId: string;
  staffId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  createdAt: Date;
  client: {
    id: string;
    name: string;
  };
  items: AppointmentServiceMock[]; // The array of services
};

// The Final Grouped Shape for your History Page
export type GroupedAppointments = Record<string, AppointmentWithRelations[]>;

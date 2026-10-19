import { Appointment, AppointmentService, Service, User } from "@/generated/prisma";

// This represents a single Service object
export type ServiceMock = {
  id: string;
  name: string;
  priceCents: number;
  durationMin: number;
};

// This represents the join table (AppointmentService)
export type AppointmentServiceMock = {
  id: string;
  appointmentId: string;
  serviceId: string;
  service: ServiceMock; // The nested service
};

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

// The Final Grouped Shape for your History Page
export type GroupedAppointments = Record<string, AppointmentWithRelations[]>;

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

export type AppointmentHistoryItem = {
  id: string
  scheduledAt: Date
  clientName: string
  status: 'COMPLETED' | 'CANCELLED' | 'NOSHOW'
}

export type AppointmentWithRelations = Appointment & {
  client: User;
  items: (AppointmentService & {
    service: Service;
  })[];
};

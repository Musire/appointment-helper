import { Appointment, AppointmentStatus, Service, Store } from "@/generated/prisma";

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


export type AppointmentDetails = Appointment & {
  client: {
    id: string;
    fullName: string | null;
    email: string;
    phone: string | null;
  };

  store: Store;

  staff: {
    id: string;
    fullName: string | null;
  };

  services: Service[];

  breaks: {
    id: string;
    startsAt: Date;
    endsAt: Date;
  }[];
};

export type AppointmentBase = {
  id: string;
  client: ClientDetails;
  barberId: string;        
  store: StoreDetails;     
  scheduledAt: Date;       
  createdAt: Date;
  checkedAt: Date | null;   
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

export type ExtendedUserAppointment = Appointment & {
  client: {
    fullName: string | null;
  };
  items: string[];
};



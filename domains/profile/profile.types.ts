import { $Enums } from "@/generated/prisma";


export type Profile = {
    id: string;
    email: string;
    createdAt: Date;
    fullName: string | null;
    avatarUrl: string | null;
    phone: string | null;
    authId: string | null;
} | null | undefined



export type Requirement = {
  label: string;
  completed: boolean;
};

export type AccountStatus = {
  active: boolean;
  requirements: Requirement[];
};

export type Metrics = {
  pending: number;
  checkedIn: number;
  completed: number;
}

export type StoreHours = {
    id: string;
    label: string;
    isActive: boolean;
    start: string;
    end: string;
}[]

export type storeInfo = {
      id: string;
      name: string;
      address: string;
      active: boolean;
      requirements: Requirement[];
  };


export type StoreMetrics = {
  services: number;
  staff: number;
  invites: number;
};

export type RawHour = {
  id: string;
  end: string;
  label: string;
  isActive: boolean;
  start: string;
};

export type DaySchedule = {
  day: string;
  start: string | null;
  end: string | null;
};
import { AppointmentStatus, ServiceType } from "@/generated/prisma";

// Helper to cycle through all status values
const statuses: AppointmentStatus[] = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NOSHOW"];

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
            type: ServiceType.SINGLE,
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
          service: { id: "srv-2", name: "Beard Trim", priceCents: 2000, durationMin: 15, type: ServiceType.SINGLE },
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
        service: { id: "srv-3", name: "Skin Fade", priceCents: 4000, durationMin: 45, type: ServiceType.SINGLE },
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
        service: { id: "srv-4", name: "Buzz Cut", priceCents: 2500, durationMin: 20, type: ServiceType.SINGLE },
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
        service: { id: "srv-5", name: "Combo Pack", priceCents: 6500, durationMin: 60, type: ServiceType.COMBO },
      },
    ],
  })),
};

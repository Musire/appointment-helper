
import "dotenv/config";

import {
  AppointmentStatus,
  PrismaClient,
} from "@/generated/prisma";

import { PrismaPg } from "@prisma/adapter-pg";
import { randomUUID } from "crypto";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// --------------------------------------------------
// CONFIGURATION
// --------------------------------------------------

const STORE_ID = "f47b10ec-9a2b-433e-964a-8ed1c269ac9e";
const STAFF_ID = "576d097f-c9d8-4b88-b56e-6da705092755";

const users = [
  "b435073b-fd17-47e1-8964-baa030331797",
  "58083f34-4947-449c-8589-53cab943f561",
  "8d612235-252a-4c1a-93c3-826bb693faab",
  "f572ff6d-fe55-423a-8b8c-2a29224580f4",
  "7684bdd8-808a-4de2-89d7-4804cc1a6661",
  "d89827b0-acb7-4de5-a0cf-07419043d48b",
  "7d248824-24cf-43f2-95a6-cfad5d1612b0",
  "21d49ae8-1337-42cc-8878-70807ea9339e",
  "b695a4c3-38ea-4eac-b671-ea104eb2cfd1",
  "ca0f1abf-96a7-49ae-bf9e-fa63bf2b33de",
];

const services = [
  {
    id: "2ada585b-c5ea-4fb5-932f-03775ea33ab3",
    price: 250,
    duration: 30,
  },
  {
    id: "f1da623d-7519-4984-a575-2095c89a71d4",
    price: 150,
    duration: 20,
  },
];

const appointmentStatuses = {
  past: [
    AppointmentStatus.COMPLETED,
    AppointmentStatus.CANCELLED,
    AppointmentStatus.NOSHOW,
  ],
  future: [
    AppointmentStatus.PENDING,
    AppointmentStatus.PENDING,
    AppointmentStatus.PENDING,
  ],
};

// --------------------------------------------------
// DATE HELPERS
// --------------------------------------------------

function startOfWeek(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);

  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + diff);

  return result;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
}

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomTime(): number {
  // Appointment starts between 9 AM and 4:30 PM.
  const start = 9 * 60;
  const end = 17 * 60;

  return (
    start +
    Math.floor(Math.random() * ((end - start) / 30)) * 30
  );
}

// --------------------------------------------------
// APPOINTMENT GENERATION
// --------------------------------------------------

function generateAppointments() {
  const now = new Date();
  const monday = startOfWeek(now);
  const previousMonday = addDays(monday, -7);

  const appointments = [];

  // Previous week + elapsed days of current week.
  const pastEnd = new Date(now);
  pastEnd.setHours(0, 0, 0, 0);

  for (
    let date = new Date(previousMonday);
    date < pastEnd;
    date = addDays(date, 1)
  ) {
    // 5 appointments per day.
    for (let i = 0; i < 5; i++) {
      const service = randomItem(services);
      const startTime = randomTime();

      appointments.push({
        id: randomUUID(),
        storeId: STORE_ID,
        staffId: STAFF_ID,
        userId: randomItem(users),
        date: new Date(date),
        startTime,
        endTime: startTime + service.duration,
        status: randomItem(appointmentStatuses.past),
        createdAt: addDays(date, -2),
        checkedInAt: null,
      });
    }
  }

  // Current day + remaining days of current week.
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  for (
    let date = new Date(today);
    date < addDays(monday, 7);
    date = addDays(date, 1)
  ) {
    for (let i = 0; i < 5; i++) {
      const service = randomItem(services);
      const startTime = randomTime();

      appointments.push({
        id: randomUUID(),
        storeId: STORE_ID,
        staffId: STAFF_ID,
        userId: randomItem(users),
        date: new Date(date),
        startTime,
        endTime: startTime + service.duration,
        status: randomItem(appointmentStatuses.future),
        createdAt: new Date(now),
        checkedInAt: null,
      });
    }
  }

  return appointments;
}

// --------------------------------------------------
// SEED
// --------------------------------------------------

async function main() {
  const appointments = generateAppointments();

  console.log(`Generated ${appointments.length} appointments.`);

  await prisma.$transaction(
    async (tx) => {
      // Delete all existing appointments.
      await tx.appointment.deleteMany({});

      // Insert all generated appointments in one query.
      await tx.appointment.createMany({
        data: appointments,
      });
    },
    {
      maxWait: 10000,
      timeout: 30000,
    }
  );

  console.log("Appointments seeded successfully.");

  const count = await prisma.appointment.count({
    where: {
      storeId: STORE_ID,
    },
  });

  console.log(`Appointments in database for this store: ${count}`);

  const dbUrl = new URL(process.env.DATABASE_URL!);

  console.log("Connected database:", {
    host: dbUrl.hostname,
    database: dbUrl.pathname,
  });
}

main()
  .catch((error) => {
    console.error("Appointment seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

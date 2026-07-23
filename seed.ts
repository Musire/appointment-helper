
import { v4 as uuidv4 } from 'uuid';

import { prisma } from "@/lib/prisma";

const storeHoursData = [
  {
    id: uuidv4(),
    storeConfigId: "63c8afb0-9483-4aa4-8d1f-ec98b4702f5f",
    label: "lun - vier",
    isActive: true,
    start: "09:00 AM",
    end: "05:00 PM"
  },
  {
    id: uuidv4(),
    storeConfigId: "63c8afb0-9483-4aa4-8d1f-ec98b4702f5f",
    label: "sabado",
    isActive: false,
    start: "10:00 PM",
    end: "04:00 PM"
  },
  {
    id: uuidv4(),
    storeConfigId: "63c8afb0-9483-4aa4-8d1f-ec98b4702f5f",
    label: "domingo",
    isActive: false,
    start: "12:00 AM",
    end: "05:00 PM"
  }
];

async function main() {
  console.log('Start seeding store hours...');
  
  for (const hour of storeHoursData) {
    const result = await prisma.storeHour.create({
      data: hour,
    });
    console.log(`Created store hour row with id: ${result.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
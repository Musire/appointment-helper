import { prisma } from "@/lib/prisma";

const INITIAL_STORE_HOURS = [
  { id: 'row-001', label: "lun - vier", isActive: true, start: "09:00 AM", end: "05:00 PM" },
  { id: 'row-002', label: "sabado", isActive: true, start: "10:00 AM", end: "04:00 PM" },
  { id: 'row-003', label: "domingo", isActive: false, start: "10:00 AM", end: "02:00 PM" },
];

const TARGET_STORE_ID = 'c6f818ca-926f-4f69-9529-fc441fb64d8c'; 

async function run() {
  console.log('⏳ Running one-off update script...');

  // 1. Ensure the parent StoreConfig exists for your target store
  const config = await prisma.storeConfig.upsert({
    where: { storeId: TARGET_STORE_ID },
    create: { storeId: TARGET_STORE_ID },
    update: {}, 
  });

  // 2. Wipe any hours tied to this config and insert your default array
  await prisma.$transaction([
    prisma.storeHour.deleteMany({
      where: { storeConfigId: config.id }
    }),
    prisma.storeConfig.update({
      where: { id: config.id },
      data: {
        hours: {
          createMany: {
            data: INITIAL_STORE_HOURS.map((row) => ({
              id: row.id,
              label: row.label,
              isActive: row.isActive,
              start: row.start,
              end: row.end
            }))
          }
        }
      }
    })
  ]);

  console.log('✅ Store hours populated successfully inside Supabase!');
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());



import "dotenv/config";

import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomUUID } from "crypto";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const USER_ROLE_ID = "f1eff4a3-7b54-4e64-9af3-ab4b241bc3e6";

const testUsers = [
  { fullName: "John Smith", email: "john.smith.test@example.com" },
  { fullName: "Maria Garcia", email: "maria.garcia.test@example.com" },
  { fullName: "Daniel Clark", email: "daniel.clark.test@example.com" },
  { fullName: "Emily Johnson", email: "emily.johnson.test@example.com" },
  { fullName: "Ryan Wilson", email: "ryan.wilson.test@example.com" },
  { fullName: "Jessica Lewis", email: "jessica.lewis.test@example.com" },
  { fullName: "Matthew Walker", email: "matthew.walker.test@example.com" },
  { fullName: "Robert Taylor", email: "robert.taylor.test@example.com" },
  { fullName: "Olivia Martin", email: "olivia.martin.test@example.com" },
  { fullName: "Andrew White", email: "andrew.white.test@example.com" },
];

async function main() {
  const role = await prisma.role.findUnique({
    where: { id: USER_ROLE_ID },
  });

  if (!role) {
    throw new Error("USER role not found.");
  }

  await prisma.$transaction(async (tx) => {
    for (const user of testUsers) {
      const existingUser = await tx.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        await tx.user.update({
          where: { id: existingUser.id },
          data: { fullName: user.fullName },
        });

        await tx.userRole.upsert({
          where: {
            userId_roleId: {
              userId: existingUser.id,
              roleId: USER_ROLE_ID,
            },
          },
          update: {},
          create: {
            userId: existingUser.id,
            roleId: USER_ROLE_ID,
          },
        });

        continue;
      }

      await tx.user.create({
        data: {
          id: randomUUID(),
          email: user.email,
          fullName: user.fullName,
          roles: {
            create: {
              roleId: USER_ROLE_ID,
            },
          },
        },
      });
    }
  });

  console.log(`Successfully seeded ${testUsers.length} test users.`);
}

main()
  .catch((error) => {
    console.error("User seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

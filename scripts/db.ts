import "dotenv/config";
import { prisma } from "@/lib/prisma"; // adjust path if needed

async function main() {
  const [row] = await prisma.$queryRaw<
    { current_user: string; session_user: string }[]
  >`SELECT current_user, session_user`;

  console.log("DB identity:", row);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

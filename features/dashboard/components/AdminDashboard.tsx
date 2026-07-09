import { getCurrentUser } from "@/domains/identity/actions/auth.actions";
import { AdminControl } from "@/domains/store/components";
import { prisma } from "@/lib/prisma";

export type StoreType = {
  id: string;
  name: string;
  description: string | null;
  timezone: string;
  status: string;
  createdAt: Date;
  createdById: string;
}

export default async function AdminDashboard () {
  const user = await getCurrentUser()
  const stores: StoreType[] = await prisma.store.findMany({
    where: {
      createdById: user?.id,
      status: { not: 'SUSPENDED'}
    },
  })

  return (
    <main className="py-6 flex-1">
        <AdminControl items={stores} />
    </main>
  );
}
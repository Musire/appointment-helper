import { getCurrentUser } from "@/app/actions/auth.actions";
import { AdminControl } from "@/components/dashboards";
import { LogoutButton } from "@/components/UI/buttons";
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
    <div className="page-layout">
        <div className="display-layout py-6">
            <h1 className="text-3xl capitalize w-full text-center">admin dashboard</h1>
            <LogoutButton />
            <AdminControl items={stores} />
        </div>
    </div>
  );
}

import { getCurrentUser } from "@/app/actions/auth.actions";
import NotificationsClient from "@/components/dashboards/client/staff/NotificationClient";
import { LogoutButton } from "@/components/UI/buttons";

export default async function StaffDashboard () {
  const user = await getCurrentUser()

  return (
    <main className="page-layout">
        <div className="display-layout py-6 space-y-6">
            <h1 className="text-3xl capitalize w-full text-center">staff dashboard</h1>
            <LogoutButton />
            <NotificationsClient userId={user?.id ?? null} />
        </div>
    </main>
  );
}
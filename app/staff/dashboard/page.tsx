import { getCurrentUser, hasStaffProfile } from "@/app/actions/auth.actions";
import { ProfileCreation } from "@/components/dashboards";
import NotificationsClient from "@/components/dashboards/staff/NotificationClient";

export default async function StaffDashboard () {
  const user = await getCurrentUser()
  const { data: profile } = await hasStaffProfile()

  return (
    <div className="py-6 relative">
      <ProfileCreation profile={profile} />
      <NotificationsClient userId={user?.id ?? null} />
    </div>
  );
}
import { hasStaffProfile } from "@/app/actions/auth.actions";
import { ProfileCreation } from "@/components/dashboards";

export default async function StaffDashboard () {
  const { data: profile } = await hasStaffProfile()

  return (
    <div className="py-6 relative">
      <ProfileCreation profile={profile} />
    </div>
  );
}
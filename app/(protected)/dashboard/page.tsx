import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import { AdminDashboard } from "@/features/dashboard/components";
import EndUserDashboardDataLayer from "@/features/dashboard/components/EndUserDashboardDataLayer";
import StaffDashboardDataLayer from "@/features/dashboard/components/StaffDashboardDataLayer";

export default async function DashboardPage() {
  return (
    <RoleRenderer
      roles={{
        ADMIN: <AdminDashboard />,
        STAFF: <StaffDashboardDataLayer />,
        USER: <EndUserDashboardDataLayer />
      }}>
    </RoleRenderer>
  )
}
